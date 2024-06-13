import yaml from 'js-yaml';
// Some API calls are needed to be run on the api server. 
// The api helper method here is used for these calls.
import { api } from "../helpers/ApiHelper";

const snakeCase = (str) => {
    // Assuming 'title' is already defined
// Step 1: Lowercase the title
let snakeCaseStr = String(str).toLowerCase();

// Step 2: Remove special characters except spaces
snakeCaseStr = snakeCaseStr.replace(/[^a-z0-9 ]/g, "");

// Step 3: Replace spaces with underscores
snakeCaseStr = snakeCaseStr.replace(/\s+/g, "_");

return snakeCaseStr
}


export const createNewDashboard = async (columns, filterList, targetFolder, title, setNewDashboardId) => {
    // Step 1: Filter out 'tiles' column and extract the remaining column values
    const filteredColumns = Object.entries(columns)
        .filter(([key, _]) => key !== 'tiles')
        .map(([_, value]) => value);
    // Step 2: Flat map to get a list of ids from the columns
    const componentDashboardIds = filteredColumns.flatMap(column => 
        column.items.map(item => item.id)
    );
    // Step 3: Compose an array of objects with the dashboard id and the LookML object
    let lookmlArray = await Promise.all(componentDashboardIds.map(async (id) => {
        // This request didn't work through the client sdk, so using it on the api side.
        const response = await api
            .get(`${process.env.API_HOST}/api/dashboard-lookml/${id}`)
        if (response && response.lookml) {
            // Parse the YAML document
            const yamlResponse = yaml.load(response.lookml);
            let lookmlObject = yamlResponse[0];
            // Add the sourceTileDashboardId to the LookML object
            // This will later aid in 'rehydrating' the dashboard canvas
            lookmlObject.elements[0].source_tile_dashboard_id = id;
            // Filter out unwanted filters
            if (lookmlObject && lookmlObject.filters) {
                lookmlObject.filters = lookmlObject.filters.filter((filter) => {
                    return filterList.includes(filter.name)
                });
                // Fix the 'listen' for each element also - only include the filters in the list
                lookmlObject.elements.forEach((element) => {
                    let newListen = {};
                    Object.keys(element.listen).forEach((key) => {
                        filterList.includes(key) && (newListen[key] = element.listen[key])
                        })
                    element.listen = newListen;
                })
            }
            return {
                'id':id,
                'lookml':lookmlObject
            }; 
        }
    }));

    // Step 4: Adjust the element positions
    // Looker dashboard layout has 24 columns, so we need to adjust the 'col' and 'width' values
    const numberOfColumnsRequested = filteredColumns.length;
    const width = 24 / numberOfColumnsRequested;
    const height = 4; // Each element is set at 4 rows high. This is arbitrary and can be adjusted.
    // Loop through the columns and items to adjust the positions of the elements
    filteredColumns.forEach((column, index) => {
        column.items.forEach((item, itemIndex) => {
            const lookmlObject = lookmlArray.find(lookml => lookml.id === item.id).lookml;
            console.log('item',item)
            console.log('lookmlObject',lookmlObject)
            lookmlObject.elements[0].col = index * width,
            lookmlObject.elements[0].width = width,
            lookmlObject.elements[0].row = itemIndex * height,
            lookmlObject.elements[0].height = height
        });
    })

    // Step 5: Compose a new dashboard with elements
    let newDashboard = {}
    newDashboard.dashboard = snakeCase(title)
    newDashboard.title = title
    newDashboard.layout = 'newspaper'
    newDashboard.preferred_viewer = 'dashboards-next'
    newDashboard.crossfilter_enabled = true
    newDashboard.description = ''
    newDashboard.elements = lookmlArray.map(lookml => lookml.lookml.elements[0]);

    // Step 6: Compose the filters in the new dashboard object
    newDashboard.filters = filterList.map(filterName => {
        // For each filter name in filterList, find the first matching filter in lookmlArray.lookml.filters
        const matchingFilter = lookmlArray.map(lookml => lookml.lookml.filters || [])
            .flat() // Flatten the array of filter arrays into a single array
            .find(filter => filter && filter.name === filterName); // Find the first filter that matches the filterName
        if (!matchingFilter) {
            console.warn(`Warning: No matching filter found for '${filterName}'.`);
        }
        return matchingFilter; // Return the found filter, or undefined if not found
    }).filter(filter => filter !== undefined); // Filter out any undefined entries (in case a filter was not found)

    // Step 7: Create a new dashboard in the target folder
    const dashboardObject = [newDashboard]
    // Not sure if this character handling is necessary in all cases, but it's here for now
    const newYaml = yaml.dump(dashboardObject).replace(/\r\n?/g, "\n");
    const body = {
        folder_id: targetFolder,
        lookml: newYaml
      }
    //   Use the backend API to create the new dashboard
    const response = await api
            .post(`${process.env.API_HOST}/api/import-dashboard`,body)
    
    setNewDashboardId(response.id)
}

export default createNewDashboard;
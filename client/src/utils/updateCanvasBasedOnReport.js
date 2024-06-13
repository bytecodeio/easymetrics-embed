import yaml from 'js-yaml';
// Some API calls are needed to be run on the api server. 
// The api helper method here is used for these calls.
import { api } from "../helpers/ApiHelper";

async function updateCanvasBasedOnReport(report, tiles, setColumns, setDashboardName, setFilterSet, setWide) {
    // Step 1: Fetch the report data based on reportName
    const response = await api
        .get(`${process.env.API_HOST}/api/dashboard-lookml/${report.id}`)
    // Step 2: Extract source_tile_dashboard_id from elements to populate columns
    if (response && response.lookml) {
        // Parse the YAML document
        const yamlResponse = yaml.load(response.lookml);
        let reportData = yamlResponse[0];
        
        const sourceTileDashboardIds = reportData.elements.map(element => element.source_tile_dashboard_id);
        
        // Step 3: Determine and set width
        const isWide = reportData.elements.every(element => element.width === 24);
        setWide(isWide);

        // Based on the selected layout, the 
        // dashboard will be displayed in a single column or two columns
        // Step 4: Set the columns based on the layout
        if (isWide) {  
            const usedTiles = tiles.filter(tile => sourceTileDashboardIds.includes(tile.id));
            const unusedTiles = tiles.filter(tile => !sourceTileDashboardIds.includes(tile.id)); 
            setColumns({
                tiles: {
                name: "Tiles",
                items: unusedTiles,
        
                },
                column1: {
                name: "List Style Dashboard",
                image: "",
                items: usedTiles,
                },
            }); // Ensure unique IDs and set columns
        } else {
            // find the tiles for elements in the first column
            const firstColumnTiles = tiles
                .filter(tile => reportData.elements
                    .filter(tile => tile.row === 0)
                    .map(tile => tile.source_title_dashboard_id)
                    .includes(tile.id));

            // find the tiles for elements in the second column
            const secondColumnTiles = tiles
                .filter(tile => reportData.elements
                    .filter(tile => tile.row === 12)
                    .map(tile => tile.source_title_dashboard_id)
                    .includes(tile.id));
            const unusedTiles = tiles.filter(tile => !sourceTileDashboardIds.includes(tile.id));
            setColumns({
                tiles: {
                    name: "Tiles",
                    items: unusedTiles,
                },
                column1: {
                    name: "Left Dashboard Column",
                    image: "",
                    items: firstColumnTiles,
                },
                column2: {
                    name: "Right Dashboard Column",
                    image: "",
                    items: secondColumnTiles,
                },
            })
        }
        // Step 5: Set the dashboard name
        setDashboardName(reportData.title);

        
        // Step 6: Extract and set filters
        console.log(reportData)
        const filters = reportData.filters
            .map(filter => filter && filter.name);
            console.log(filters)
        setFilterSet(new Set(filters)); // Ensure unique filter names
    }
    
}


export default updateCanvasBasedOnReport
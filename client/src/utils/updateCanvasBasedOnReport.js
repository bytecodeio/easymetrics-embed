import yaml from 'js-yaml';
import { api } from "../helpers/ApiHelper";

async function updateCanvasBasedOnReport(report, tiles, setColumns, setDashboardName, setFilterSet, setWide, setLayout) {
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
        const isWide = reportData.elements.some(element => element.width === '24' || element.width === 24);
        setWide(isWide);
        setLayout(isWide ? 'list' : 'grid');
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
            console.log('inside else')
            // find the tiles for elements in the first column
            const firstColumnTiles = tiles
                .filter(tile => reportData.elements
                    .filter(element => element.row === 0)
                    .map(element => element.source_tile_dashboard_id)
                    .includes(tile.id));

            // find the tiles for elements in the second column
            const secondColumnTiles = tiles
                .filter(tile => reportData.elements
                    .filter(element => element.row !== 0)
                    .map(element => element.source_tile_dashboard_id)
                    .includes(tile.id));
            console.log('firstColumnTiles', firstColumnTiles)
            console.log('secondColumnTiles', secondColumnTiles)
            const unusedTiles = tiles.filter(tile => !sourceTileDashboardIds.includes(tile.id));
            console.log('unusedTiles', unusedTiles)
            setColumns({
                tiles: {
                    name: "Tiles",
                    items: unusedTiles,
                },
                column1: {
                    name: "Left Dashboard Column",
                    items: firstColumnTiles,
                },
                column2: {
                    name: "Right Dashboard Column",
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
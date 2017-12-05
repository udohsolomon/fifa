/** Class implementing the map view. */
class Map {
    /**
     * Creates a Map Object
     */
    constructor() {
        this.projection = d3.geoConicConformal().scale(150).translate([400, 350]);
    }

    /**
     * Function that clears the map
     */
    clearMap() {

        // ******* TODO: PART V*******
        // Clear the map of any colors/markers; You can do this with inline styling or by
        // defining a class style in styles.css

        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for hosts/teams/winners, you can use
        // d3 selection and .classed to set these classes on and off here.
        d3.select("#points").selectAll("circle")
            .remove();

        d3.select("#map").selectAll("path")
            .classed("host", false)
            .classed("team", false);
    }

    /**
     * Update Map with info for a specific FIFA World Cup
     * @param worldcupData the data for one specific world cup
     */
    updateMap(worldcupData) {

        //Clear any previous selections;
        this.clearMap();

        // ******* TODO: PART V *******

        // Add a marker for the winner and runner up to the map.

        // Hint: remember we have a conveniently labeled class called .winner
        // as well as a .silver. These have styling attributes for the two
        // markers.

        this.addMedalMarker(worldcupData);

        // Select the host country and change it's color accordingly.
        d3.select("#" + worldcupData["host_country_code"])
            .classed("host", true);

        // Iterate through all participating teams and change their color as well.
        worldcupData["teams_iso"].forEach(function (team) {
            d3.select("#" + team)
                .classed("team", true);
        });

        // We strongly suggest using CSS classes to style the selected countries.
        // Add a marker for gold/silver medalists
    }

    addMedalMarker(data) {
        let d = [];
        let gold = {};
        gold["LON"] = data["WIN_LON"];
        gold["LAT"] = data["WIN_LAT"];
        gold["medal"] = "gold";
        d.push(gold);

        let silver = {};
        silver["LON"] = data["RUP_LON"];
        silver["LAT"] = data["RUP_LAT"];
        silver["medal"] = "silver";
        d.push(silver);

        this.addMarker(d, "WIN_LON", "WIN_LAT", "gold");
    }

    addMarker(data, coord_lon, coord_lat, medalColor) {

        let projection = this.projection;
        d3.select("#points").selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                //return projection([d.lon, d.lat])[0];
                return projection([d["LON"], d["LAT"]])[0];
            })
            .attr("cy", function (d) {
                //return projection([d["WIN_LAT"], d["WIN_LON"]])[1];
                return projection([d["LON"], d["LAT"]])[1];
            })
            .attr("r", function (d) {
                return 10;
            })
            .attr("class", function (d) {
                return d["medal"];
            });
    }

    /**
     * Renders the actual map
     * @param world json data with the shape of all countries
     */
    drawMap(world) {

        //(note that projection is a class member
        // updateMap() will need it to add the winner/runner_up markers.)

        // ******* TODO: PART IV *******

        // Draw the background (country outlines; hint: use #map)
        // Make sure and add gridlines to the map

        // Hint: assign an id to each country path to make it easier to select afterwards
        // we suggest you use the variable in the data element's .id field to set the id

        // Make sure and give your paths the appropriate class (see the .css selectors at
        // the top of the provided html file)


        // This converts the projected lat/lon coordinates into an SVG path string
        let path = d3.geoPath().projection(this.projection);

        let geojson = topojson.feature(world, world.objects.countries);

        let mappath = d3.select("#map").selectAll("path")
            .data(geojson.features);

        mappath.enter()
            .append("path")

            .attr("d", path)
            .attr("id", function (d) {
                return d["id"];
            })
            .classed("countries", true);

        let graticule = d3.geoGraticule();
        d3.select("#map").append('path')
            .datum(graticule)
            .attr('class', "grat")
            .attr('d', path)
            .attr('fill', 'none');
    }


}

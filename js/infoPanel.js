/** Class implementing the infoPanel view. */
class InfoPanel {
    /**
     * Creates a infoPanel Object
     */
    constructor() {
        let ul = d3.select('#teams').append('ul');
    }

    /**
     * Update the info panel to show info about the currently selected world cup
     * @param oneWorldCup the currently selected world cup
     */
    updateInfo(oneWorldCup) {

        // ******* TODO: PART III *******

        // Update the text elements in the infoBox to reflect:
        // World Cup Title, host, winner, runner_up, and all participating teams that year

        // Hint: For the list of teams, you can create an list element for each team.
        // Hint: Select the appropriate ids to update the text content.

        //Set Labels
        let host = d3.select("#host");
        host.text(oneWorldCup['host']);

        let title = d3.select('#edition');
        title.text(oneWorldCup['edition']);

        let winner = d3.select('#winner');
        winner.text(oneWorldCup['winner']);

        let silver = d3.select('#silver');
        silver.text(oneWorldCup['runner_up']);


        let ld = oneWorldCup['TEAM_NAMES'].split(",");

        d3.select('#teams').selectAll('ul').remove();

        let ul = d3.select('#teams').append('ul');

        ul.selectAll('li')
            .data(ld)
            .enter()
            .append('li')
            .html(String)
            .on("click", function(d) {
                updateSelectedCountry(d);
            });

        function updateSelectedCountry(team){
            cleanUp();
            d3.select('#selected_team_info').text(team + " participated in:");
            d3.select('#winner_in_info').text(team + " winner in:");
            d3.select('#runner_up_in_team_info').text(team + " runner up in:");

            participatedIn(team);
        }

        function cleanUp(){
            //alert("here");
            d3.select('#selected_team').selectAll('ul').remove();
            d3.select('#winner_in_team').selectAll('ul').remove();
            d3.select('#runner_up_in_team').selectAll('ul').remove();
        }

        function participatedIn(team) {
            let participated = [];
            let runner_up = [];
            let winner = [];
            window.barChart.allData.forEach(function (d) {
               if(d["TEAM_NAMES"].includes(team)){
                   participated.push(d["EDITION"]);
               }
               if(d["winner"] === team){
                   winner.push(d["EDITION"]);
               }
               if(d["runner_up"] === team){
                   runner_up.push(d["EDITION"]);
               }
            });

            addList("#selected_team_info", participated);
            addList("#winner_in_info", winner);
            addList("#runner_up_in_team_info", runner_up);
        }

        function addList(idName, data) {
            let ul = d3.select(idName).append('ul');
            ul.selectAll('li')
                .data(data)
                .enter()
                .append('li')
                .html(String);
        }
    }
}
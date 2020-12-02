/** Class representing the visualization infobox. */
class InfoBox {
    /**
     * Creates a InfoBox Object
     * @param data the full data array
     */
    constructor(data) {

        this.data = data;
        this.updateTextDescription("FRA");
    }

    /**
     * Renders the country description
     * @param activeCountry the IDs for the active country
     * @param activeYear the year to render the data for
     */
    updateTextDescription(activeCountry) {

        let that = this;
        if (activeCountry === null || activeCountry === undefined) {
            return;
        }

        else {
            // Removes the previous country's data
            this.clearHighlight();

            // Converts the abbreviated country name to the actual country name
            let goodName = that.data["population"].filter(d => d.geo === activeCountry.toLowerCase());

            if (goodName[0]["country"] === "USA") {
                goodName[0]["country"] = "United States";
            }

            // Selects the current country
            let selectedCountry = that.data["countries"].filter(d => d.Country === goodName[0]["country"]);

            // Adds the info box to the bottom left of the css grid layout
            let infoApp = d3.select("#infobox").classed("bottomleft-grid", true).append("div").attr("class", "country-detail")
            .attr("transform", "translate(0, 500)")
            .classed("bottomleft-grid", true).attr("id", "infoboxdiv");

            // Adds the country name text
            infoApp.append("h2").text("Country: " + goodName[0]["country"]).attr("id", "Country-Name");

            // If there is no data for the given country (either because it wasn't collected or that country
            // never participated in a World Cup) display N/A for that country's statistics. Else, display
            // the given country's statistics
            if (selectedCountry.length === 0) {
                infoApp.append("h4").text("All-Time World Cup Record " + " (W-L-D): N/A" );
                infoApp.append("h4").text("Highest Finish: N/A");
                infoApp.append("h4").text("Average Goals per Game: N/A");
                infoApp.append("h4").text("Average Goals Conceded per Game: N/A");
                infoApp.append("h4").text("Total World Cups Won: N/A");
            }
            else {
                infoApp.append("h4").text("All-Time World Cup Record " + " (W-L-D): " + selectedCountry[0]["AllTimeRecord"]);
                infoApp.append("h4").text("Highest Finish: " + selectedCountry[0]["HighestEverFinish"]);
                infoApp.append("h4").text("Average Goals per Game: " + parseFloat(selectedCountry[0]["GoalsPerGame"]).toFixed(2));
                infoApp.append("h4").text("Average Goals Conceded per Game: " + parseFloat(selectedCountry[0]["GoalsConcededPerGame"]).toFixed(2));
                infoApp.append("h4").text("Total World Cups Won: " + selectedCountry[0]["WorldCupWins"]);
            }
        }
    }

    /**
     * Removes or makes invisible the info box
     */
    clearHighlight() {
        d3.select("#infoboxdiv").remove();
    }
}

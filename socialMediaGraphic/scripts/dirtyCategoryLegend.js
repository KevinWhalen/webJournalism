    var w = 660;
    var h = w * 0.45;
    // variables. coordinates origin is upper left.
    var frameWidth = w;
    var frameHeight = h;
    var barLength = frameWidth * 0.92; // was 88% when w was 77%
    var legendWidth = frameWidth * 0.05;

    // icon diameter for width/height and such
    var iconDiameter = frameHeight * 0.12; // was 15%

    // global data object
    var titleData = window.researchData;
    var titleCount = Object.keys(titleData).length;

//---------------------------------------------------------------------------
    // container
    d3.select("body").select("#container").append("div")
        .attr("id", "legendRegion")
        .attr("width", frameWidth)
        .attr("height", (iconDiameter * 3))
        .style("background-image", "url('images/subtle_white_feathers.png')")
        .style("display", "inline-block")
//      .style("border-style", "solid")
        .style("margin-left", "auto")
        .style("margin-right", "auto");

    // graphic
    var svg = d3.select("body").select("#legendRegion").append("svg")
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("xlink", "http://www.w3.org/1999/xlink")
        .attr("id", "legendSVG")
        .attr("width", frameWidth)
        .attr("height", (iconDiameter * 3))
        .attr("stroke", "black")
        .attr("stroke-width", 0)
        // transition graphic
        .on("mouseover", function(d,i){
            animateGraphic(barLength, legendWidth, frameHeight, titleCount, iconDiameter);
        })
        // transition back to starting state
        .on("mouseout", function(d,i){
            //reverseGraphic(barLength, legendWidth, frameHeight, titleCount, iconDiameter);
        })
        .on("click", function(d,i){
            animateGraphic(barLength, legendWidth, frameHeight, titleCount, iconDiameter);
        })
        .style("margin-left", "auto")
        .style("margin-right", "auto")
        .style("border-style", "solid")
        //.style("border-style", "none")
        .style("border-width", 0.15 + "em")
        .style("border-color", "black");

//---------------------------------------------------------------------------
// Category Legend
svg.append("g").attr("id", "g_legend");
var categories = titleData[0]["category"];
categories.forEach(function(s, sID){
	d3.xml(s["file"], "image/svg+xml", function(error,xml){
		document.getElementById("g_legend").appendChild(xml.documentElement);

		svg.select("#svg_" + s["shape"])
			.attr("id", "legend_" + s["shape"])
			.attr("width", (iconDiameter * 0.60))
			.attr("height", (iconDiameter * 0.60))
			.attr("x", (10 + iconDiameter * 0.10))
			.attr("y", (sID * iconDiameter) + 10);

		svg.select("#img_" + s["shape"])
			.attr("id", "img_legend_" + s["shape"])
			.attr("xlink:title", "Click the category icons for more information.")
			.attr("width", (iconDiameter * 0.60))
			.attr("height", (iconDiameter * 0.60))
			.on("click", function(){
			alert("Click the category icons in the graphic below to explore the research based rating information.");
			});

		svg.select("#g_legend").append("text")
			.attr("id", "key_" + s["shape"])
			.attr("x", (20 + (iconDiameter * 0.10) + iconDiameter))
			.attr("y", (sID * iconDiameter) + 10 + (iconDiameter * 0.50))
			.style("font-size", (iconDiameter * 0.50) + "px")
			.style("fill", "black")
			.attr("stroke", "white")
			.attr("stroke-width", 0.5)
			.text(s["title"]);
	});
});


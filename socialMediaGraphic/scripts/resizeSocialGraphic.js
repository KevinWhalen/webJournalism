/* resizeSocialGraphic.js
 * 
 * Kevin Whalen
 * 2/17/13
*/

//function resizeGraphic(w = 800, h = 360)
function resizeGraphic(w, h)
{
	// variables. coordinates origin is upper left.
	var frameWidth = w;
	var frameHeight = h;
	var barOffsetX = frameWidth * 0.06; // was 6%
	var barOffsetY = frameHeight * 0.49;
	var barLength = frameWidth * 0.92; // was 88% when w was 77%
	var barThickness = frameHeight * 0.015;
	var legendWidth = frameWidth * 0.05;

	// icon diameter for width/height and such
	var iconDiameter = frameHeight * 0.12; // was 15%

	// global data object
	var titleData = window.researchData;
	// a count of the number of objects in the array.
	var titleCount = Object.keys(titleData).length;


//---------------------------------------------------------------------------
	// container
	d3.select("body").select("#container").select("#graphicRegion")
		.attr("width", frameWidth)
		.attr("height", frameHeight);

	// graphic
	var svg = d3.select("body").select("#graphicRegion").select("#mainSVG")
		.attr("width", frameWidth)
		.attr("height", frameHeight);


//---------------------------------------------------------------------------
	// center bar
	svg.select("#centerBar")
		.attr("width", barLength)
		.attr("height", barThickness)
		.attr("x", barOffsetX)
		.attr("y", barOffsetY);


//---------------------------------------------------------------------------
	// vertical bar: legend 
	svg.select("#legendBar")
		.attr("width", legendWidth)
		.attr("height", (frameHeight - (frameHeight * 0.05)))
		.attr("y", (frameHeight * 0.025));

	// legend key
	svg.select("upperLegendKey")
		.attr("x", (legendWidth / 3))
		.attr("y", legendWidth)
		.style("font-size", (legendWidth * 0.65) + "px");
	svg.select("lowerLegendKey")
		.attr("x", (legendWidth / 5))
		.attr("y", (frameHeight - (legendWidth / 2)))
		.style("font-size", (legendWidth * 0.65) + "px");


//---------------------------------------------------------------------------
// Media Title Circles
// Still here because of variable scope.

	// center of the graph
	var centerY = (barOffsetY + (barThickness / 2));

	// container already created with id. (more direct selection?)
	var svg = d3.select("#mainSVG");

	// media site title bubbles
	titleData.forEach(function(d,i,a){
		// size and location
		 svg.select("#svg_" + d["name"])
			// svg location in a svg is center based
			.attr("x", barOffsetX - (iconDiameter / 2))
			.attr("y", centerY - (iconDiameter / 2));
		 svg.select("#img_" + d["name"])
			.attr("width", iconDiameter)
			.attr("height", iconDiameter);
	});


//---------------------------------------------------------------------------
// Category Shapes
	// helper function for setting X-Axis position of categories.
	function categoryPosition(idx, sIdx)
	{
		var segment = barLength + (barLength * 0.07);
		var offsetX = legendWidth + iconDiameter;

		var exposeRight = segment * 0.10;
		var reducedSegment = (segment - (exposeRight * 2));
		var portion = ((reducedSegment / (titleCount - 1)) * idx);
		return offsetX + portion + (sIdx * (iconDiameter * 0.50));
	}

  // articles per media site 
  titleData.forEach(function(d,i,a){
    d["category"].forEach(function(s, sID){
		var categoryGroup = svg.select("#g_" + d["name"])
		  .select("#bar_" + d["name"] + "_" + s["shape"])
			.attr("width", (iconDiameter * 0.40))
			.attr("height", 0)
			.attr("x", categoryPosition(i, sID))
			.attr("y", centerY)
			.style("display", "none");

		// give title icon starting "x" location and hide initially
		svg.select("#" + d["name"] + "_" + s["shape"])
			.attr("width", (iconDiameter * 0.60))
			.attr("height", (iconDiameter * 0.60))
			.attr("x", categoryPosition(i, sID) - (iconDiameter * 0.10))
			.attr("y", (barOffsetY - (iconDiameter / 2)))
			.style("display", "none");

		svg.select("#img_" + d["name"] + "_" + s["shape"])
			.attr("width", (iconDiameter * 0.60))
			.attr("height", (iconDiameter * 0.60));
    });
  });

// after where resize is called (on window resize) clear graphic, wait, resize again, animate.
//animateGraphic(barLength, legendWidth, frameHeight, titleCount, iconDiameter);

}


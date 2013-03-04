/* frame.js
 * 
 * Kevin Whalen
 * 2/17/13
 *
 * Array.forEach(function(element, idex, array){});
*/

// Scaled to width and height. The graphic is balanced for a 2:1 ratio of w:h.
function initiateGraphic(w = 800, h = 400)
{
// variables. coordinates origin is upper left.
	var frameWidth = w;
	var frameHeight = h;
	var barOffsetX = frameWidth * 0.06;
	var barOffsetY = frameHeight * 0.49;
	var barLength = frameWidth * 0.88;
	var barThickness = frameHeight * 0.015;
// 9-class Blues sequential color scheme
//247, 251, 255; 222, 235, 247; 198, 219, 239; 158, 202, 225; 107, 174, 214; 66, 146, 198; 33, 113, 181; 8, 81, 156; 8, 48, 107; 

//--------------------------------------------------------------------
	// Data from journalist research.
	// name = name of website
	// icon = displayed circle (SVG file)
	// category = 3 defined (0,1,2)
	//		shape = displayed representation of category (needed?) (tri,sq, dia
	//		rating = designation from -5 through 5
	//		text = write up on 'category' for 'title'
	window.titleData = [{"name": "Facebook", "rating": 5, "color": "blue"},
						{"name": "YouTube", "rating": -3, "color": "red"},
						{"name": "Reddit", "rating": -1, "color": "yellow"},
						{"name": "Google", "rating": 3, "color": "purple"},
						{"name": "Tumbler", "rating": 2, "color": "orange"},
						{"name": "Twitter", "rating": 4, "color": "green"}];
//--------------------------------------------------------------------

	var titleData = window.titleData;
	var titleCount = Object.keys(titleData).length;
/* counting stuff
	var numTitles = 0;
	for (idx in titleData){
		++numTitles;
	}
document.write("<br />" + numTitles);
numTitles = 0;
	titleData.forEach(function(d,i,a){
		++numTitles;
	});
document.write("<br />" + numTitles);
*/


	// container
	var svg = d3.select("body").select("#graphicRegion").append("svg")
		.attr("id", "mainSVG")
		.attr("width", frameWidth)
		.attr("height", frameHeight)
		.attr("stroke", "black")
		.attr("stroke-width", 0)
		// transition graphic
		.on("mouseover", function(d,i){
			animateGraphic(barLength, barOffsetX, titleCount);
		})
		// transition back to starting state
		.on("mouseout", function(d,i){
			reverseGraphic();
		}) 
		.style("margin-left", "auto")
		.style("margin-right", "auto")
		.style("border-width", 0.2 + "em")
		.style("border-style", "solid")
		.style("border-color", "black");
/*
	.on("click", function(d,i){
	})
	.append("title").text("some mouse over title text");
*/

	// center bar
	svg.append("rect")
		.attr("width", barLength)
		.attr("height", barThickness)
		.attr("x", barOffsetX)
		.attr("y", barOffsetY)
		.attr("id", "centerBar")
		.style("z-index", 1)
		.attr("fill", "dodgerblue");


// Create Media Circles

	// container already created with id. (more direct selection)
	var svg = d3.select("#mainSVG");

	// center of the graph
	var centerY = (barOffsetY + (barThickness / 2));

// Would move over to a mouse over call, but 
// then it would lose scope of variables.

	// media site title bubbles
	var titles = svg.selectAll("ellipse");
//group first
	titles.data(titleData)
		//.datum?
		.enter().append("ellipse")
		.attr("cx", barOffsetX)
		.attr("cy", centerY)
			//scale the icons here
		.attr("rx", 40)
		.attr("ry", 25)
		.attr("fill", function(d,i){
			return d["color"];
		})
		.attr("id", function(d,i){
			return "title_" + d["name"];
		})
		.style("z-index", 100);


	// articles per media site 
	//var articles = svg.selectAll
/*
	titleData.forEach(function(d,i,a){
		d3.select("#" + d["name"])
			.append("g")
			.attr("id", d["name"] + "_Group");
//		d3.select("#" + d["name"] + "_Group")
			.append("text")
			.attr("x", function(d,i){
				return 150 + (250 * i);
			})
			.attr("y", 307)
			//.attr("text-anchor", "middle")
			.style("z-index", 101)
			.text(function(d,i){ d["name"] });
	});
*/


/*
			.append("text")
			.attr("x", function(d,i){
				return 150 + (250 * i);
			})
			.attr("y", 307)
			//.attr("text-anchor", "middle")
			.style("z-index", 101)
			.text(function(d,i){ d["name"] });


		.attr("g", function(d,i){
			return "title_" + d["name"];
		})


	.on("mouseover", function(d) {
		d3.select(this).attr("stroke-width", 2);
	})
	.on("mouseout", function(d) {
		d3.select(this).attr("stroke-width", 0);
	}) 
	.on("click", //lightbox

	.append("title").text("some mouse over title text")
*/

}


function animateGraphic(barLength, barOffsetX, titleCount)
{
	// interpolate between center bar width and leave ends exposed
	window.titleData.forEach(function(d,i,a){
		d3.select("#title_" + d["name"])
			.transition() // move from right out across bar
			.delay(200)
			.duration(2500)
			.attr("cx", function(){
			// Written to allow for a variable number of sites, but 
			// doesnt account for diameter of icons.
			var offset = barLength * 0.10;
			// The 10% for the exposed ends of the center bar should instead 
			// be dependent on the number of titles.
			var totalOffset = barOffsetX + offset;
			var portion = ((barLength - (offset * 2)) / (titleCount - 1)) * i;
			return totalOffset + portion;
			});
/*
	// this transition will be on the category objects
		//d["category"].forEach(function(d,i,a){});
		//select("#category_" + d["category"]["
			.transition() // move to rating vertical position
			.delay(3000)
			.duration(2500)
			.attr("cy", function(d,i){
				//var position = 
				return (centerY - d["rating"]);
			});
*/
	});

document.getElementById("testP").innerHTML = "tranisition to";
}


function reverseGraphic()
{
//	d3.select("#mainSVG");

document.getElementById("testP").innerHTML = "tranisition from";
}

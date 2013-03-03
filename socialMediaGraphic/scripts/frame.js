/* frame.js
 * 
 * Kevin Whalen
 * 2/17/13
*/

function initiateGraphic(w = 800, h = 400)
{
// variables. coordinates origin is upper left.
	var frameWidth = w;
	var frameHeight = h;
	var barOffsetX = frameWidth * 0.05;
	var barOffsetY = frameHeight * 0.49;
	var barThickness = frameHeight * 0.015;// scale by height
// 9-class Blues sequential color scheme
//247, 251, 255; 222, 235, 247; 198, 219, 239; 158, 202, 225; 107, 174, 214; 66, 146, 198; 33, 113, 181; 8, 81, 156; 8, 48, 107; 


	// container
	var svg = d3.select("body").select("#graphicRegion").append("svg")
		.attr("id", "mainSVG")
		.attr("width", frameWidth)
		.attr("height", frameHeight)
		.attr("stroke", "black")
		.attr("stroke-width", 0)
		// transition graphic
		.on("mouseover", function(d,i){
			animateGraphic();
//			d3.select(this).attr("stroke-width", 4);
		})
		// transition back to starting state
		.on("mouseout", function(d,i){
			reverseGraphic();
//			d3.select(this).attr("stroke-width", 1);
		}) 
		.style("margin-left", "auto")
		.style("margin-right", "auto")
		.style("border-width", 0.2 + "em")
		.style("border-style", "solid")
		.style("border-color", "black");
/*

	.on("mouseover", function(d,i){
		d3.select(this).attr("stroke-width", 4);
	})
	.on("mouseout", function(d,i){
		d3.select(this).attr("stroke-width", 1);
	}) 
	.on("click", function(d,i){
	})
	.append("title").text("some mouse over title text");
*/

	// center bar
	svg.append("rect")
		.attr("width", (frameWidth * 0.88))
		.attr("height", barThickness)
		.attr("x", barOffsetX)
		.attr("y", barOffsetY)
		.attr("id", "centerBar")
		.style("z-index", 1)
		.attr("fill", "dodgerblue");


// Create Media Circles

// interpolate between center bar width
// ----------------

	// container already created with id
	var svg = d3.select("#mainSVG");

	// Data from journalist research.
	// name = name of website
	// icon = displayed circle (SVG file)
	// category = 3 defined (0,1,2)
	//		shape = displayed representation of category (needed?) (tri,sq, dia
	//		rating = designation from -5 through 5
	//		text = write up on 'category' for 'title'
	var titleData = [{"name": "Facebook", "rating": 5, "color": "blue"},
						{"name": "YouTube", "rating": -3, "color": "red"},
						{"name": "Twitter", "rating": 4, "color": "green"}];
/*
						{"name": "Google+", "w": 50, "h": 30, "color": "red"},
						{"name": "Tumbler", "w": 50, "h": 30, "color": "red"},
						{"name": "Reddit", "w": 50, "h": 30, "color": "red"},
*/
	var titleCount = Object.keys(titleData).length;
	var numTitles = 0;
/*
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

	// center of the graph
	var centerY = (barOffsetY + (barThickness / 2));

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
		.style("z-index", 100)//;
//toggleVis()?
//		.style("display", "none");

//	titles.data(titleData)
		.transition() // move from right out across bar
		.delay(200)//on event?
		.duration(2500)
		.attr("cx", function(d,i){
			return 180 + (260 * i);
		})
// this transition will be on the category objects
		.transition() // move to rating vertical position
		.delay(3000)
		.duration(2500)
		.attr("cy", function(d,i){
			//var position = 
			return (centerY - d["rating"]);
		});
/*
	titleData.forEach(function(d){
//		d3.select("#" + d.name + "Group")
		d3.select("#" + d.name)
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


	// articles per media site 
//data format??
	//var articles = svg.selectAll


/*
		.attr("g", function(d,i){
			return "title_" + d["name"];
		})


	.on("mouseover", function(d) {
		d3.select(this).attr("stroke-width", 4);
	})
	.on("mouseout", function(d) {
		d3.select(this).attr("stroke-width", 1);
	}) 
	.on("click", 

	.append("title").text("some mouse over title text")
*/

}


function animateGraphic()
{
//	d3.select("#mainSVG");
document.getElementById("testP").innerHTML = "tranisition to";
}


function reverseGraphic()
{
//	d3.select("#mainSVG");
document.getElementById("testP").innerHTML = "tranisition from";
}

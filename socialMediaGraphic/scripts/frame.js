/* frame.js
 * 
 * 2/17/13
*/

function initiateGraphic()
{
	// container
	var svg = d3.select("body").append("svg")
		.attr("id", "mainSVG")
		.attr("width", 960)
		.attr("height", 600);

	// center bar
	svg.append("rect")
		.attr("width", 800)
		.attr("height", 15)
		.attr("x", 50)
		.attr("y", 300)
		.attr("id", "centerBar")
		.style("z-index", 1)
		.attr("fill", "dodgerblue");

}

function createMediaCircles()
{
// interpolate between center bar width
// ----------------

	// container already created with id
	var svg = d3.select("#mainSVG");

	// media site title bubbles
	var titleData = [{"name": "Facebook", "rating": 150, "color": "blue"},
						{"name": "YouTube", "rating": -70, "color": "red"},
						{"name": "Twitter", "rating": 40, "color": "green"}];
/*
						{"name": "Google+", "w": 50, "h": 30, "color": "red"},
						{"name": "Tumbler", "w": 50, "h": 30, "color": "red"},
						{"name": "Reddit", "w": 50, "h": 30, "color": "red"},
*/
	var titleCount = Object.keys(titleData).length;

	var titles = svg.selectAll("ellipse");
//group first
	titles.data(titleData)
		//.datum?
		.enter().append("ellipse")
		.attr("cx", 50)
		.attr("cy", 307)
		.attr("rx", 50)
		.attr("ry", 30)
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
		.transition()
		.delay(200)//on event?
		.duration(2500)
		.attr("cx", function(d,i){
			return 180 + (260 * i);
		})
		.transition()
		.delay(3000)
		.duration(2500)
		.attr("cy", function(d,i){
			return (307 - d["rating"]);
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

	// outer hover-zone per media site
	var hover = svg.selectAll("rect");
//	hover.data(titleCount);


	// articles per media site 
//data format??
	var articles = svg.selectAll


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

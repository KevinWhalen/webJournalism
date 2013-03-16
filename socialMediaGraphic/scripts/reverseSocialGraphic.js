/* reverseSocialGraphic.js
 * 
 * Kevin Whalen
 * 2/17/13
*/

function reverseGraphic(barOffsetX, centerY)
{
	// return to starting positions
	window.researchData.forEach(function(d,i,a){
		// collapse category shapes
/*    d["category"].forEach(function(s){
      d3.select("#" + d["name"] + "_" + s["shape"])
        .transition() // move to rating vertical position
        .delay(200)
        .duration(2500)
			//.attr("y", centerY - ((iconDiameter * 0.9) / 2))
        .attr("y", centerY);
    });
*/    // then hide categories

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
		// collapse title icons
		d3.select("#svg_" + d["name"])
			.transition()
			.delay(200)
			.duration(2500)
			.attr("x", function(){
				return barOffsetX;
			});
	});
}


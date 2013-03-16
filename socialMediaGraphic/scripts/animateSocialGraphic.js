/* animateSocialGraphic.js
 * 
 * Kevin Whalen
 * 2/17/13
*/

function animateGraphic(barLength, barOffsetX, titleCount, centerY)
{
	// interpolate between center bar width and leave ends exposed
	window.researchData.forEach(function(d,i,a){
		d3.select("#svg_" + d["name"])
			.transition() // move from left out across bar
			.delay(200)
			.duration(2500)
			.attr("x", function(){
			// Written to allow for a variable number of sites, but 
			// doesnt account for diameter of icons.
			var offset = barLength * 0.10;
			// The 10% for the exposed ends of the center bar should instead 
			// be dependent on the number of titles.
			var totalOffset = barOffsetX + offset;
			var portion = ((barLength - (offset * 2)) / (titleCount - 1)) * i;
			return totalOffset + portion;
			});

	// this transition will be on the category objects
    d["category"].forEach(function(s,sID){
      d3.select("#" + d["name"] + "_" + s["shape"])
        .transition() // move to rating vertical position
        .delay(2700)
        .duration(2500)
        .style("display", "block")
        .attr("y", function(){
/*          var mapRating = d3.scale.linear()
              .domain(-5, 5)
              .range(barOffsetX, ((barLength / 2) + (barOffsetX / 2)));
*/
          var position = s["rating"];
//          position = mapRating(position);


			//.attr("y", centerY - ((iconDiameter * 0.9) / 2))
          return (centerY - position * 15);
        });
    });
	});
}


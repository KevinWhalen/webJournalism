/* animateSocialGraphic.js
 * 
 * Kevin Whalen
 * 2/17/13
*/

			// The 10% for the exposed ends of the center bar should instead 
			// be dependent on the number of titles.


function animateGraphic(segment, legendWidth, barOffsetY, titleCount, iconDiameter)
//function animateGraphic(settings)
{
	segment = segment + (segment * 0.06);
	//offsetX = barOffsetX;
	offsetX = legendWidth;// + (iconDiameter / 2);
	titleCount = titleCount;
	var centerY = barOffsetY;// - (iconDiameter / 2);

	// each researched website has an entry.
	window.researchData.forEach(function(d,i,a){
		// interpolate between center bar width and leave ends exposed
		d3.select("#svg_" + d["name"])
			.transition() // move from left out across bar
			.delay(200)
			.duration(2500)
			.attr("x", function(){
			// Written to allow for a variable number of sites, but 
			// doesnt account for diameter of icons.
			var exposeRight = segment * 0.10;
			var totalOffset = offsetX;// + offset;
			var portion = ((segment - (exposeRight * 2)) / (titleCount - 1)) * i;
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
				  .range(barOffsetX, ((segment / 2) + (barOffsetX / 2)));
	*/
				var position = s["rating"];
	//          position = mapRating(position);


				//.attr("y", centerY - ((iconDiameter * 0.9) / 2))
				return (centerY - position * 20); // was 15
			});
		  // transition of the bars that match to categories to their height
		  d3.select("#bar_" + d["name"] + "_" + s["shape"])
			.transition()
			.delay(2700)
			.duration(2500)
			.style("display", "block")
	// works for positive. need opposite for negative
			.attr("y", function(){
				var position = s['rating'];
	//			position = mapRating(position);
				position *= 20; // until map by frame height is figured out
				if (position >= 0){
					position = centerY - position;
				} else {
					position = centerY;
				}
				return position;
			})// + iconDiameter * 0.60))
			.attr("height", function(){
				var barHeight = s['rating'] * 20;
				if (barHeight < 0) barHeight *= (-1);
				return barHeight;
			})// - iconDiameter * 0.60)
/*
			.attr("height", function(){
//	          var mapRating = d3.scale.linear()
//				  .domain(-5, 5)
//				  .range(barOffsetX, ((segment / 2) + (barOffsetX / 2)));
			  var position = s["rating"];
	//          position = mapRating(position);


				//.attr("y", centerY - ((iconDiameter * 0.9) / 2))
			  //return (centerY - position * 20); // was 15
			  return (position * 20); // was 15
			})*/;
		});
	});
}


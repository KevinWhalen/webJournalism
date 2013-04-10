/* animateSocialGraphic.js
 * 
 * Kevin Whalen
 * 2/17/13
*/

		// Removed exposed ends, but remains title count independent.
			// The 10% for the exposed ends of the center bar should instead 
			// be dependent on the number of titles.


function animateGraphic(barLength, legendWidth, height, titleCount, iconDiameter)
//function animateGraphic(settings)
{
	// may have correlating category X-Axis position scaling values
	var segment = barLength + (barLength * 0.07);//6
	var offsetX = legendWidth;// + (iconDiameter / 2); // no bar edge show now
	titleCount = titleCount;
	var centerY = height * 0.49;// - (iconDiameter / 2); // bad abstraction
	var catIconD = iconDiameter * 0.60;//reference: initiate article per media site

	var rankDomain = [5,4,3,2,1,0,-1,-2,-3,-4,-5];
	var rankRangeCount = 11; // -5 through 5
	// calculate output range set for category locations
	var offsetHeight = height - (height * 0.05); // 2.5% padding on top/bottom
	var increment = offsetHeight / rankRangeCount;
	var hRange = new Array;
	var topOffset = height * 0.025;
	for (var i = 0; i < rankRangeCount; i++){
		hRange.push(topOffset + (i * increment));
	}

	// maps rank "in" domain to "out" height range
	var mapRating = d3.scale.quantize()
		.domain(rankDomain)
		.range(hRange);

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
			var reducedSegment = segment - (exposeRight * 2);
			var portion = (reducedSegment / (titleCount - 1)) * i;
console.log(segment + " i: " + i + " : " + offsetX + ", " + portion);
			return offsetX + portion;
			});

		// this transition will be on the category objects
		d["category"].forEach(function(s,sID){
		  d3.select("#" + d["name"] + "_" + s["shape"])
			.transition() // move to rating vertical position
			.delay(2700)
			.duration(2500)
			.style("display", "block")
			.attr("y", function(){
				var position = s["rating"];
				position = mapRating(position);
				return position;
			});
		  // transition of the bars that match to categories to their height
		  d3.select("#bar_" + d["name"] + "_" + s["shape"])
			.transition()
			.delay(2700)
			.duration(2500)
			.style("display", "block")
			.attr("y", function(){
				var position = s['rating'];
				position = mapRating(position);
				if (s['rating'] >= 0){
					position += catIconD;
				} else {
					position = centerY;
				}
				return position;
			})
			.attr("height", function(){
				var barHeight = s['rating'];
				barHeight = mapRating(barHeight);
				if (s['rating'] >= 0){
					barHeight = centerY - (barHeight + catIconD);
				} else {
					barHeight = barHeight - centerY;
				}
				return barHeight;
			});
		});
	});
}


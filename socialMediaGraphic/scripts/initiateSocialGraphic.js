/* frame.js
 * 
 * Kevin Whalen
 * 2/17/13
 *
 * Array.forEach(function(element, index, array){});
*/


// Scaled to width and height. The graphic is balanced for a 2:1 ratio of w:h.
//function initiateGraphic(w = 800, h = 400, global data object)
function initiateGraphic(w = 800, h = 400)
{
	// variables. coordinates origin is upper left.
	var frameWidth = w;
	var frameHeight = h;
	var barOffsetX = frameWidth * 0.06;
	var barOffsetY = frameHeight * 0.49;
	var barLength = frameWidth * 0.88;
	var barThickness = frameHeight * 0.015;

	// icon diameter for width/height and such
	var iconDiameter = frameHeight * 0.15;

  // build attribute array for use of passing the above variables to functions
  //var attrs = [frameWidth, frameHeight, barOffsetX ];

/*
	// scale rating to value inside height (top-down, 0 to frameHeight)
	var chartRating = d3.scale.linear()
		.domain[5, -5] // lower on the screen is the greater height
	.range([((iconDiameter / 2) + 5), (frameHeight - 5 - (iconDiameter / 2))])
		.interpolate();
document.getElementById("p_article").innerHTML = chartRating(-4);
*/
/*	var color = d3.scale.quantize()
			.domain([-5,5])
			.range(["rgb(#,#,#)", ""]); // needs 11 colors
// or
	var color = d3.scale.linear()
		.domain([-5,5])
		.range(["#7A8F9D","#D1DBE8"]) // needs 2 colors
		.interpolate(d3.interpolateHcl);
// or maybe use saturation?
*/
// 9-class Blues sequential color scheme
//247, 251, 255; 222, 235, 247; 198, 219, 239; 158, 202, 225; 107, 174, 214; 66, 146, 198; 33, 113, 181; 8, 81, 156; 8, 48, 107; 
// example:
// var fillColor = color(-4.5); // = -5 = lowest color in range.

//--------------------------------------------------------------------
	// Data from journalist research.
	// name = name of website
	// icon = displayed circle (SVG file)
	// category = 3 defined (0,1,2)
	//		shape = displayed representation of category (needed?) (tri,sq, dia
	//		rating = designation from -5 through 5
	//		text = write up on 'category' for 'title'

// Will be insterted into a script in the html page as a global/window object.
// Instead of d3.json to avoid an asynchronous load here.
	window.researchData = 
[
	{"name": "Facebook", "icon": "images/icons/facebook.svg", "category":
		[
		{"shape": "diamond", "rating": 5, "text": "test text facebook circle", 
      "file": "images/icons/diamond.svg"},
		{"shape": "square", "rating": 2, "text": "test facebook rectangle", 
      "file": "images/icons/square.svg"},
		{"shape": "triangle", "rating": 5, "text": "test text facebooke ellipse", 
      "file": "images/icons/triangle.svg"}
		]
	},
	{"name": "Twitter", "icon": "images/icons/twitter.svg", "category":
		[
		{"shape": "diamond", "rating": 0, "text": "test text circle", 
      "file": "images/icons/diamond.svg"},
		{"shape": "square", "rating": 0, "text": "test text rectangle", 
      "file": "images/icons/square.svg"},
		{"shape": "triangle", "rating": 0, "text": "test text ellipse", 
      "file": "images/icons/triangle.svg"}
		]
	},
	{"name": "Tumblr", "icon": "images/icons/tumblr.svg", "category":
		[
		{"shape": "diamond", "rating": -5, "text": "test text circle", 
      "file": "images/icons/diamond.svg"},
		{"shape": "square", "rating": -5, "text": "test text rectangle", 
      "file": "images/icons/square.svg"},
		{"shape": "triangle", "rating": -4, "text": "test text ellipse", 
      "file": "images/icons/triangle.svg"}
		]
	},
	{"name": "WordPress", "icon": "images/icons/wordpress.svg", "category":
		[
		{"shape": "diamond", "rating": -5, "text": "test text circle", 
      "file": "images/icons/diamond.svg"},
		{"shape": "square", "rating": 3, "text": "test text rectangle", 
      "file": "images/icons/square.svg"},
		{"shape": "triangle", "rating": 1, "text": "test text ellipse", 
      "file": "images/icons/triangle.svg"}
		]
	},
	{"name": "Reddit", "icon": "images/icons/reddit.svg", "category":
		[
		{"shape": "diamond", "rating": -5, "text": "test text circle", 
      "file": "images/icons/diamond.svg"},
		{"shape": "square", "rating": -4, "text": "test text rectangle", 
      "file": "images/icons/square.svg"},
		{"shape": "triangle", "rating": -5, "text": "test text ellipse", 
      "file": "images/icons/triangle.svg"}
		]
	},
	{"name": "Pinterest", "icon": "images/icons/pinterest.svg", "category":
		[
		{"shape": "diamond", "rating": -5, "text": "test text circle", 
      "file": "images/icons/diamond.svg"},
		{"shape": "square", "rating": 0, "text": "test text rectangle", 
      "file": "images/icons/square.svg"},
		{"shape": "triangle", "rating": 0, "text": "test text ellipse", 
      "file": "images/icons/triangle.svg"}
		]
	},
	{"name": "YouTube", "icon": "images/icons/youtube.svg", "category":
		[
		{"shape": "diamond", "rating": 5, "text": "test text circle", 
      "file": "images/icons/diamond.svg"},
		{"shape": "square", "rating": 2, "text": "test text rectangle", 
      "file": "images/icons/square.svg"},
		{"shape": "triangle", "rating": 3, "text": "test text ellipse", 
      "file": "images/icons/triangle.svg"}
		]
	}
];
//--------------------------------------------------------------------

//	var titleData = window.researchData; // global data object will be from page
	var titleData = window.researchData;
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
		.attr("xmlns", "http://www.w3.org/2000/svg")
		.attr("xlink", "http://www.w3.org/1999/xlink")
		.attr("id", "mainSVG")
		.attr("width", frameWidth)
		.attr("height", frameHeight)
		.attr("stroke", "black")
		.attr("stroke-width", 0)
		// transition graphic
		.on("mouseover", function(d,i){
			animateGraphic(barLength, (barOffsetX - (iconDiameter / 2)), titleCount, (barOffsetY - (iconDiameter / 2)));
		})
		// transition back to starting state
		.on("mouseout", function(d,i){
			reverseGraphic((barOffsetX - (iconDiameter / 2)), (barOffsetY - (iconDiameter / 2)));
		}) 
		.on("click", function(d,i){
// write toggle function
			animateGraphic(barLength, (barOffsetX - (iconDiameter / 2)), titleCount, (barOffsetY - (iconDiameter / 2)));
		})
		.style("z-index", 1)
		.style("margin-left", "auto")
		.style("margin-right", "auto")
//		.style("border-style", "solid")
		.style("border-style", "none")
		.style("border-width", 0.2 + "em")
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
		.style("z-index", 2)
		//.attr("fill", "#829CAB");
		.attr("fill", "#BDDCA2");


//---------------------------------------------------------------------------
// Media Title Circles
// Still here because of variable scope.

	// center of the graph
	var centerY = (barOffsetY + (barThickness / 2));

	// container already created with id. (more direct selection?)
	var svg = d3.select("#mainSVG");

	// media site title bubbles
titleData.forEach(function(d,i,a){
	// add container groups for each website
	svg.append("g").attr("id", "g_" + d["name"]);

	// async?
	// insert SVG image files as XML
	d3.xml(d["icon"], "image/svg+xml", function(error,xml){
		// inner XML IDs: svg_name, group_name, img_name
	document.getElementById("g_" + d["name"]).appendChild(xml.documentElement);

		// if async, might have to move groupings and articles here
		// size and location
		 svg.select("#svg_" + d["name"])
			// svg location in a svg is center based
			.attr("x", barOffsetX - (iconDiameter / 2))
			.attr("y", centerY - (iconDiameter / 2));
		 svg.select("#img_" + d["name"])
			.attr("xlink:title", d["name"])
			.attr("width", iconDiameter)
			.attr("height", iconDiameter);
//			.on("click", );
	});
});

/*
	var titles = svg.selectAll("ellipse");
	titles.data(titleData)
		.enter().append("ellipse")
*/
//---------------------------------------------------------------------------

	// articles per media site 
	//var articles = svg.selectAll

	titleData.forEach(function(d,i,a){
    d["category"].forEach(function(s, sID){
      d3.xml(s["file"], "image/svg+xml", function(error,xml){
	document.getElementById("g_" + d["name"]).appendChild(xml.documentElement);

		 svg.select("#svg_" + s["shape"])
      // set new id
      .attr("id", d["name"] + "_" + s["shape"])
			.attr("width", (iconDiameter * 0.80))
			.attr("height", (iconDiameter * 0.80))
      // give title icon starting "x" location and hide initially
      .attr("x", function(){
      var offset = barLength * 0.10;
      var totalOffset = barOffsetX + offset;
      var portion = ((barLength - (offset * 2)) / (titleCount - 1)) * i;
      return totalOffset + portion;
      })
			.attr("y", (barOffsetY - (iconDiameter / 2)))
      .style("display", "none");
		 svg.select("#img_" + s["shape"])
		  .attr("id", "#img_" + d["name"] + "_" + s["shape"])
			.attr("xlink:title", s["shape"])
			.attr("width", (iconDiameter * 0.80))
			.attr("height", (iconDiameter * 0.80));

//        .attr("fill", "dodgerblue")
  //			.attr("text-anchor", "middle")
  //			.text(function(d,i){ d["name"] });

      });
    });
  });



/* --  Snippets  -------------------------------------------------------

		d3.select("#" + name + "LinkGroup").append("a")
			.attr("xlink:href", fileList[i] + "?state=" +
				name + "&date=" + window.YM)
			.attr("xlink:title", "Click to open a new visualization.")
			.attr("xlink:show", "new")
			.append("text")
				.attr("x", Hoffset)
				.attr("y", Voffset + (i * 20))
				.text(nameList[i]);


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


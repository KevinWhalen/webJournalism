/* readyFunc.js
 * 
 * Kevin Whalen
 * 2/17/13
*/

$(document).ready(function(){
  //$(window).resize(function(){});
  $(window).resize(function(){
    var width = window.innerWidth * 0.77;
    var height = width * 0.50;
    //resizeGraphic(width, height); // select instead of append. if another layer of groupings was added, this might abstract out to frame, centerBar, title icon images, shape images.
  });

});

/* toggleVisibility.js
 *
 * Changes the display style to or from block and none.
 * Requires an elements id as #idName.
*/

function toggleVis(object)
{
	if (document.getElementById(object).style.display=="none"){
		document.getElementById(object).style.display="block";
	} else {
		document.getElementById(object).style.display="none";
	}
}

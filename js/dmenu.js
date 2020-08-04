/*#####################################################
# This script is Copyright 2003, Infinity Web Design  #
# Written by Ryan Brill - ryan@infinitypages.com      #
# All Rights Reserved - Do not remove this notice     #
#####################################################*/

startup = ""; //Comments on this below

/*
 * COMMENTS ABOUT THE startup VARIABLE -
 * Leave the startup variable blank to run as normal, enter 1 to start with the entire menu maximized. 
 * Additionally, each item can be either be displayed or not displayed in the following fashion:
 * 1|1|1|1|0|0|1|1 where 1's mean to display, and 0's mean not to display. So, in that
 * example, the first, second, third and fourth items would be displayed, the fifth and
 * sixth would not be displayed, and the seventh and eigth would be displayed on startup. Be sure
 * you set all top level items (items without submenus) to 1, or they will never be displayed!
*/

function init() {
	menu = document.getElementById("menu_container"); //get the container element
	spans = menu.getElementsByTagName("span"); //grab all the spans
	for (i=0; i<spans.length; i++) {
		spans[i].onclick = showhide; //set the onclick to run the showhide funcion for each span
	}
	/*Initialize the menu. For browsers without JavaScript enabled, it will remain in it's down state*/

	divs = menu.getElementsByTagName("div"); //grab all the divs
	
	str = "";
	
	allcookies = document.cookie; //get the cookies
	
	if (allcookies) {
		pos = allcookies.indexOf("menu="); //get the position of the start of our cookie
		if (pos != -1) {
			start = pos + 5; //set start to the beginning of our cookies value
			end = allcookies.indexOf(";", start); //get to the end of our cookie
			if (end == -1) {
				end = allcookies.length; //or get to the end of all cookies (if it is the last one)
			}
			str = allcookies.substring(start, end);	//grab our cookies value (from start to end)
		}
		else if (startup != "") { //if startup is not blank
			str = startup; //grab the values out of startup
		}
	}
		
	if (str.length > 0) { //if we found the cookie to set display to block or none
		str = str.replace(/1/g, "block"); //replace 1 with block
		str = str.replace(/0/g, "none"); //replace 0 with none
		str = str.split("|"); //split at the pipe
		while (str.length <= divs.length) { //if we have more divs that display (block|none) to fill it with
			str[str.length] = "block"; //fill array with blocks
		}
		for (i=0; i<divs.length; i++) { 
			if (str[i] == "block") { //if it needs to be block
				divs[i].style.display = str[i]; //display
			}
			else {
				divs[i].style.display = str[i]; //hide
			}
			if (divs[i].childNodes[0].childNodes[0].src != undefined && str[i+1] == "none") { //if div contains an image, and if the next div's display is none
				divs[i].childNodes[0].childNodes[0].src = "images/plus.gif"; //set image for down state
			}
		}
	}
	else {
		for (i=0; i<divs.length; i++) {
			child = divs[i].getElementsByTagName("div"); //grab all the child divs
			for (j=0; j<child.length; j++) {
				child[j].style.display = "none"; //hide
			}
			if (divs[i].childNodes[0].childNodes[0].src != undefined) { //if the div contains an image
				divs[i].childNodes[0].childNodes[0].src = "images/plus.gif"; //set image for down state
			}
		}
	}
}
function showhide() {
	obj = this.parentNode; //get parent element (div in our case)
	elems = obj.childNodes; //get child nodes
	for (i=0; i<elems.length; i++) {
		if (elems[i].tagName == "DIV") { //if child node is a div
			if (elems[i].style.display == "none") { //if elemnt is
				elems[i].style.display = "block"; //display
				this.childNodes[0].src = "images/minus.gif"; //set image for down state
			}
			else {
				elems[i].style.display = "none"; //hide
				this.childNodes[0].src = "images/plus.gif"; //set image for up state
			}
		}
	}
	menu = document.getElementById("menu_container"); //get the container element
	divs = menu.getElementsByTagName("div"); //grab all the divs
	val = "";
	for (i=0; i<divs.length; i++) {
		display = (divs[i].style.display == "" || divs[i].style.display == "block") ? 1 : 0; //set display to 1 or 0 depending on the display value of the div
		val += display+"|"; //concatenate the value
	}
	val = val.substring(0,val.length-1); //strip off the final pipe (|)
	document.cookie = "menu="+val;
}
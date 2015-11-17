// ELEMENTS & VARIABLES
//-------------------------------------
var body = document.querySelector("body");
var nameDisplayed = document.querySelector(".colorname");
var list = document.querySelector("ul");
var theme = {
	"color": ""
}


// EVENT LISTENERS
//----------------------------------------

window.addEventListener("load", pageLoad);
list.addEventListener('click', handleClick); 
//this will also be triggered when you click an li, 
//because of event bubbling - the event goes "through"
//hitting the li and also hitting the ul underneath it.
//BUT the target will be the top element the click touched.


//PAGE SETUP
//-----------------------------------------
//Pulls the last color class stored in "theme" and sets it on page load
function pageLoad (event) {
	if (localStorage.getItem("theme") === null) {
		changeColor(theme);
	}
	else {
		theme = JSON.parse(localStorage.getItem("theme"));
		changeColor(theme);
	}
}




// EVENT HANDLER
//----------------------------------------
function handleClick(event) {
	//return early unless the swatch was clicked
	if (event.target.tagName === "UL") {
		return;
	}

	//gets the class of the thing you clicked
	var clicked = event.target;
	//stores it in clickedColor
	var clickedColor = clicked.getAttribute("class");
	//"Update the data model" - stores this new class in the theme object
	theme.color = clickedColor;

	//Call function to update page (passing updated object as argument)
	changeColor(theme);

	//"Save the data model to local storage"
	localStorage.setItem("theme", JSON.stringify(theme));
}



function changeColor(theme) {
	var newColor = theme.color;
	var currentColor = body.getAttribute("class");

	if(currentColor == newColor) {
		body.setAttribute("class", "");
		nameDisplayed.textContent = "none";
	}
	
	else {
		body.setAttribute("class", theme.color);
		nameDisplayed.textContent = theme.color;
	}
}











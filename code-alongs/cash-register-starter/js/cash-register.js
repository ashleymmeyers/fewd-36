// Structure
// ------------------------------------------------
var form    = document.querySelector("form");
var input   = document.querySelector("input");
var entries = document.querySelector(".entries");
var total   = document.querySelector(".total");
var receipt = {
	"items": []
}

// Setup
// ------------------------------------------------
var totalValue = 0;


// Events
// ------------------------------------------------
form.addEventListener("submit", newItem);
window.addEventListener("load", pageLoad);
entries.addEventListener("click", removeItem);




// Event handler function


function pageLoad (event) {
	if (localStorage.getItem("receipt") === null) {
		return;
	};

	receipt = JSON.parse(localStorage.getItem("receipt"));

	//run displayItem for everything already stored in array
	receipt.items.forEach(displayItem);

}

function displayItem (e) {

	var newLI = document.createElement("li");
	newLI.textContent = "$" + e;
	entries.appendChild(newLI);
	
	// Add newPrice to whatever is currently in totalValue (starts with 0) and save back to totalValue
	totalValue = totalValue + e;

	// put new totalValue and $ inside the Total element
	total.textContent="$" + totalValue;

}

function newItem (e) {
	e.preventDefault();	

	// If nothing in the field, end function
	if (input.value.length==0) {
		return;
	}
	
	// create newPrice variable and set it as the integer-ed version of what was in the field.
	var newPrice = parseFloat(input.value);

	// If newPrice is not defined (because it couldn't parseInt because it was a string with letters), end function
	if (isNaN(newPrice)) {
		return;
	}

	//run displayItem for the price you entered
	displayItem(newPrice);

	//add this new amount to stored array
	receipt.items.push(newPrice);
	localStorage.setItem("receipt", JSON.stringify(receipt));

	form.reset();
}

function removeItem (e) {
	if (event.target.tagName === "UL") {
		return;
	}
	var child = e.target;
	
	var parent = e.target.parentElement;
	var parentArray = parent.children; //only needed for line 91 not a real array? Node list? 

	//calculate position using LI's index in UL
	var position = Array.prototype.indexOf.call(parent.children, child);
	// var position = parentArray.indexOf(child); //WHY DOESN'T THIS WORK?

	//Subtract from totalValue and update total text
	removedPrice = receipt.items[position];
	totalValue = totalValue - removedPrice;
	total.textContent="$" + totalValue;

	//use splice to delete the item from the array
	receipt.items.splice(position, 1);

	//update the localStorage
	localStorage.setItem("receipt", JSON.stringify(receipt));

	//remove child element from DOM
	parent.removeChild(child);






}



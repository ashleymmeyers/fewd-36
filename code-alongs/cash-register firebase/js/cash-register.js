// Structure
// ------------------------------------------------
var form    = document.querySelector("form");
var input   = document.querySelector("input");
var entries = document.querySelector(".entries");
var total   = document.querySelector(".total");

// Setup
// ------------------------------------------------
var totalValue = 0;
var receipt = {
	"items": []
}
var firebase = new Firebase("https://sushi-register.firebaseio.com/");


// Events
// ------------------------------------------------
form.addEventListener("submit", newItem);
window.addEventListener("load", pageLoad);
entries.addEventListener("click", removeItem);




// Event handler function


//change to FIREBASE
function pageLoad (event) {

	//special firebase event listener to call a function when data changes on Firebase
	firebase.on("value", dataChanged);

	// if (localStorage.getItem("receipt") === null) {
	// 	return;
	// };

	// receipt = JSON.parse(localStorage.getItem("receipt"));

	// //run displayItem for everything already stored in array
	// receipt.items.forEach(displayItem);

}

function dataChanged(snapshot) {
	//reset the page

	totalValue = 0;
	total.textContent="$" + totalValue;
	entries.innerHTML = "";

	//error check, return early if null/empty
	if (snapshot.val() === null) {
		return;
	}

	//set receipt array to what was passed through from Firebase
	receipt = snapshot.val();

	//populate the page
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

//CHANGE TO FIREBASE
	//add this new amount to stored array
	receipt.items.push(newPrice);
	firebase.set(receipt);

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


	//use splice to delete the item from the array
	receipt.items.splice(position, 1);

	//update the localStorage
	firebase.set(receipt);

}




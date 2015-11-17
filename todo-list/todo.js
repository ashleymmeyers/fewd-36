// Structure
// ----------------------------------------------
var taskInput = document.querySelector(".task");
var dateInput = document.querySelector(".date");
var addButton = document.querySelector("button");
var form = document.querySelector("form");
var list = document.querySelector("ul");
// var checkbox = document.querySelector(".check");



//OBJECT SETUP
//----------------------------
var taskz = [];

var task1 = {
	name: "call mom",
	date: "11/22/2015", // or blank string "" or null or undefined
	completed: false,
}

var task2 = {
	name: "exercise",
	date: undefined,
	completed: true,
};


// Events
// ----------------------------------------------
form.addEventListener("submit", addNewTodo);
// list.addEventListener -- this will be for event delegation later



// Event handlers
// ----------------------------------------------

//FUNCTION TO ADD TO TODO
function addNewTodo(e) {
	e.preventDefault();
	console.log("test");
//variable for values entered
	var newTask = taskInput.value;
	var newDate = dateInput.value;

//all new elements
	var newLi = document.createElement("li");
	var newLabel = document.createElement("label");
	var newSpan = document.createElement("span");
	var newPdate = document.createElement("p");
	var newCheckbox = document.createElement("input");

//decorate and fill elements
//Checkbox
	newCheckbox.setAttribute("type", "checkbox");
	newCheckbox.setAttribute("class", "check");
	newCheckbox.addEventListener("click", testIt);
//task
	newSpan.textContent = newTask;
	newSpan.setAttribute("class", "todo");
//duedate
	newPdate.setAttribute("class", "duedate");
	if (newDate.length>0) {
		newPdate.textContent = "(" + newDate + ")";
	}


//place elements
	newSpan.appendChild(newPdate);
	newLabel.appendChild(newCheckbox);
	newLabel.appendChild(newSpan);
	newLi.appendChild(newLabel);
	list.appendChild(newLi);

//clear form
	form.reset();
};


function testIt(e) {
	console.log("test");
	console.log(event.target);
}


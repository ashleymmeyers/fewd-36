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
var todo = {
	"taskList": []
}




// Events
// ----------------------------------------------
window.addEventListener("load", pageLoad);
form.addEventListener("submit", addNewTodo);
// list.addEventListener -- this will be for event delegation later



// Event handlers
// ----------------------------------------------

//Page load
function pageLoad(e) {
	if (localStorage.getItem("todo") === null) {
		return;
	}
	else {
		todo = JSON.parse(localStorage.getItem("todo"));
		todo.taskList.forEach(displayTask);
	}


}

function displayTask (e) {





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
	newCheckbox.addEventListener("click", checkTask);
	//task
	newSpan.textContent = e.name;
	newSpan.setAttribute("class", "todo");	
	//duedate
	newPdate.setAttribute("class", "duedate");
	newPdate.textContent = e.date;

	//place elements
	newSpan.appendChild(newPdate);
	newLabel.appendChild(newCheckbox);
	newLabel.appendChild(newSpan);
	newLi.appendChild(newLabel);
	list.appendChild(newLi);


}




//FUNCTION TO ADD TO TODO
function addNewTodo(e) {
	e.preventDefault();
	//variable for values entered
	var newTask = taskInput.value;
	var newDate = dateInput.value;

	if (newDate.length>0) {
		newDate = "(" + newDate + ")";
	}

	//store in JSON
	taskObject = {
		name: newTask,
		date: newDate,
		completed: false,
	}

	displayTask(taskObject);


	//add object to array
	todo.taskList.push(taskObject);
	//store in local storage
	localStorage.setItem("todo", JSON.stringify(todo));

	//clear form
	form.reset();
};




function checkTask(e) {
	console.log("test");
	console.log(e.target);
	e.target
}


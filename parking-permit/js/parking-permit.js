// Structure
// ----------------------------------------------
//ZONE CHECK FORM
	var checkForm = document.querySelector('.zonecheck');
	var checkNumber = document.querySelector('#checknumber');
	var checkStreet = document.querySelector('#checkstreet');
	var checkZip = document.querySelector('#checkzip');

//ZONE RESULTS
var zoneData;
var myStreet;
var myZone = document.querySelector('.letter');
var myFee = document.querySelector('.fee');
var myExpDate;
var myCleanDate = document.querySelector('#cleandate');
var news = document.querySelector('.news');
var zoneTag = document.querySelector('#zonetag');


//APP FORM
var appNumber = document.querySelector('#appnumber');
var appStreet = document.querySelector('#appstreet');
var appZip = document.querySelector('#appzip');



// Events
// ----------------------------------------------
checkForm.addEventListener("submit", getZone);




// Setup
// ----------------------------------------------





// Event handlers
// ----------------------------------------------
function getZone(e){
	event.preventDefault();
	myStreet = checkStreet.value;
	myStreet = myStreet.toLowerCase();
	jQuery.getJSON("http://ashleymmeyers.github.io/fewd-36/parking-permit/js/zones.json", storeJSON);
}

function storeJSON(json){
	// console.log("storeJSON");
	zoneData = json["zones"];
	setZone();
}

function setZone () {
	// console.log("setZone");
	//Checking if neither "fell" nor "larkin", if so return
	if ( (myStreet.indexOf("fell") == -1) && (myStreet.indexOf("larkin") == -1) ) {
		console.log("no street");
		return;
	}

	//check if "fell", if so set var zoneData to object 0
	if (myStreet.indexOf("fell") == 0) {
		zoneData = zoneData[0];
	}

	//check if "larkin", if so set var zoneData to object 1
	if (myStreet.indexOf("larkin") == 0) {
		zoneData = zoneData[1]
	}

	showZone();


}


// Update page functions
// ----------------------------------------------
//to display zone result
function showZone() {
	// console.log("showZone");
	zone = zoneData["zone"]
	news.textContent = "Good news! Your address qualifies."
	zoneTag.removeAttribute("class"); 
	zoneTag.setAttribute("class", zone);
	myCleanDate.textContent = ("on " + zoneData["clean_date"]);

	myZone.textContent = zone;
	
	myFee.textContent = zone + " Zone permits expire annually on " + zoneData["exp_date"] + ". Because this is in less than 6 months, your annual fee of $111 will be reduced to $55 this year.";
	preFill();
}

//to pre-fill application form & copy (also capitalizes street in Check Zone form input)
function preFill(e) {
	// console.log("preFill")
	checkStreet.value = toTitleCase(myStreet);
	appStreet.value = toTitleCase(myStreet);
	appNumber.value = checkNumber.value;
	appZip.value = checkZip.value;
}




//Formatting 
// ----------------------------------------------
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
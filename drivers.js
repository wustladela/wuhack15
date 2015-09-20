Parse.initialize("eamcKJmUTepWXqQzYx5iNmgVUcX55xvCQX749IfY", "Gg3ZOGnMTkHaMIOZ0OJHsig6QwU5j8Jev2RkIZML");

document.getElementById("driverSubmitBtn").addEventListener("click", submitRide, false);

function submitRide(event) {
	var pickupLoc = document.getElementById("pickupLoc").value;
  var destination = document.getElementById("destination").value;
	var date = document.getElementById("datePicker").value;
	var time = document.getElementById("timePicker").value.toLocaleString();
	var dateTime = new Date(date + " " + time);
	var numSeats = Number(document.getElementById("numSeats").value);
	var price = Number(document.getElementById("driverPrice").value);


	if (!pickupLoc || !destination || !date || !time || !numSeats || !price) {
		return;
	}

  var now = new Date();
  if (dateTime <= now) {
    alert("Time travel doesn't exist!");
    return;
  }

	var Rides = Parse.Object.extend("Rides");
  var rides = new Rides();
  rides.set("pickupLoc", pickupLoc);
  rides.set("destination", destination);
  rides.set("date", dateTime);
  rides.set("numSeats", numSeats);
  rides.set("price", price);
  rides.set("createdBy", Parse.User.current());
  var first = Parse.User.current().get("firstName");
  var last = Parse.User.current().get("lastName");
  var driverName = first + " " + last;
  rides.set("driverName", driverName);

  rides.save(null, {
		success: function(gameScore) {
  // Execute any logic that should take place after the object is saved.
 		alert("success");
	},
	error: function(gameScore, error) {
  // Execute any logic that should take place if the save fails.
  // error is a Parse.Error with an error code and message.
   alert('Failed to create new object, with error code: ' + error.message);
	}
});
}

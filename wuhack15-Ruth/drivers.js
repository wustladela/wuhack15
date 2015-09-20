Parse.initialize("eamcKJmUTepWXqQzYx5iNmgVUcX55xvCQX749IfY", "Gg3ZOGnMTkHaMIOZ0OJHsig6QwU5j8Jev2RkIZML");

document.getElementById("driverSubmitBtn").addEventListener("click", submitRide, false);
document.addEventListener("DOMContentLoaded", getExistingRides, false);
if (!Parse.User.current()){
    window.location="index.html"
  }
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
  rides.set("riders", []);
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

function getExistingRides(event) {
  var user = Parse.User.current();
  var userExistingRides = user.get("existingRides");
  for (var i = 0; i < userExistingRides.length; i++) {
    var UsersRides = Parse.Object.extend("Rides");
    var usersRides = new UsersRides();
    var ridesQuery = new Parse.Query(UsersRides);
    ridesQuery.equalTo("objectId", userExistingRides[i]);
    ridesQuery.find({
      success: function(ride) {
        var node = document.createElement("div");
        node.class = "posting";

        var destination = document.createElement("h3");
        destination.innerHTML = ride[0].get("destination");
        node.appendChild(destination);

        var nameLabel = document.createElement("label");
        nameLabel.innerHTML = "Driver's Name: ";
        node.appendChild(nameLabel);
        var driversName = document.createTextNode(ride[0].get("driverName"));
        node.appendChild(driversName);
        var br1 = document.createElement("br"); 
        node.appendChild(br1);

        var pickupLabel = document.createElement("label");
        pickupLabel.innerHTML = "Pickup Location:    ";
        node.appendChild(pickupLabel);
        var pickupLoc = document.createTextNode(ride[0].get("pickupLoc"));         
        node.appendChild(pickupLoc);
        var br3 = document.createElement("br"); 
        node.appendChild(br3);

        var dateLabel = document.createElement("label");
        dateLabel.innerHTML = "Date:    ";
        node.appendChild(dateLabel);
        var date = new Date(ride[0].get("date"));
        var localDate = date.toLocaleTimeString();
        var dateNode = document.createTextNode(date);   
        node.appendChild(dateNode);    
        var br4 = document.createElement("br"); 
        node.appendChild(br4);

        var priceLabel = document.createElement("label");
        priceLabel.innerHTML = "Price:    ";
        node.appendChild(priceLabel);
        var price = document.createTextNode(ride[0].get("price"));
        node.appendChild(price);
        var br5 = document.createElement("br"); 
        node.appendChild(br5);

        var availabilityLabel = document.createElement("label");
        availabilityLabel.innerHTML = "Availability:    ";
        node.appendChild(availabilityLabel);
        var availability = document.createTextNode(ride[0].get("numSeats"));
        node.appendChild(availability);
        var br6 = document.createElement("br"); 
        node.appendChild(br6);

        document.getElementById("existingRides").appendChild(node);
      }
    });
  }
}

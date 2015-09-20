Parse.initialize("eamcKJmUTepWXqQzYx5iNmgVUcX55xvCQX749IfY", "Gg3ZOGnMTkHaMIOZ0OJHsig6QwU5j8Jev2RkIZML");

document.addEventListener("DOMContentLoaded", function(event) {
	var Rides = Parse.Object.extend("Rides");
	var rides = new Rides();
	var query = new Parse.Query(Rides);
	var now = new Date();
	query.greaterThan("date", now);
	query.ascending("date");
	query.find({
		success: function(results) {
			for (i = 0; i < results.length; i++) {
				var ride = results[i];
				var node = document.createElement("div");
				node.class = "posting";


				var destination = document.createElement("h3");
				destination.innerHTML = ride.get("destination");
				node.appendChild(destination);

				var nameLabel = document.createElement("label");
				nameLabel.innerHTML = "Driver's Name: ";
				node.appendChild(nameLabel);
				var driversName = document.createTextNode(ride.get("driverName"));
				node.appendChild(driversName);
				var br1 = document.createElement("br"); 
				node.appendChild(br1);

				var pickupLabel = document.createElement("label");
				pickupLabel.innerHTML = "Pickup Location:    ";
				node.appendChild(pickupLabel);
				var pickupLoc = document.createTextNode(ride.get("pickupLoc"));         
				node.appendChild(pickupLoc);
				var br3 = document.createElement("br"); 
				node.appendChild(br3);

				var dateLabel = document.createElement("label");
				dateLabel.innerHTML = "Date:    ";
				node.appendChild(dateLabel);
				var date = new Date(ride.get("date"));
				var localDate = date.toLocaleTimeString();
				var dateNode = document.createTextNode(date);   
				node.appendChild(dateNode);    
				var br4 = document.createElement("br"); 
				node.appendChild(br4);

				var priceLabel = document.createElement("label");
				priceLabel.innerHTML = "Price:    ";
				node.appendChild(priceLabel);
				var price = document.createTextNode(ride.get("price"));
				node.appendChild(price);
				var br5 = document.createElement("br"); 
				node.appendChild(br5);

				var availabilityLabel = document.createElement("label");
				availabilityLabel.innerHTML = "Availability:    ";
				node.appendChild(availabilityLabel);
				var availability = document.createTextNode(ride.get("numSeats"));
				node.appendChild(availability);
				var br6 = document.createElement("br"); 
				node.appendChild(br6);

				var joinRideBtn = document.createElement("button");
				joinRideBtn.innerHTML = "Join Ride!";
				joinRideBtn.id = ride.id;
				joinRideBtn.addEventListener("click", function(event) {

					var Rides2 = Parse.Object.extend("Rides");
					var rides2 = new Rides();
					rides2.id = event.target.id;
					rides2.add("riders", Parse.User.current().get("firstName") + " " + Parse.User.current().get("lastName"));
					rides2.increment("availability", -1);
					rides2.save(null, {
						success: function(object) {
							alert("You successfully joined this ride!");
						}, 
						error: function(error) {
							alert("Error: " + error.code + " " + error.message);
						}
					});

					var currUser = Parse.User.current();
					currUser.add("existingRides", event.target.id);
					currUser.save();

				}, false);
				node.appendChild(joinRideBtn);
				
				document.getElementById("drivers").appendChild(node);
			}
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});

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

				document.getElementById("riders").appendChild(node);
			}
		});
	}


}, false);







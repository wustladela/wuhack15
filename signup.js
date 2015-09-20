Parse.initialize("eamcKJmUTepWXqQzYx5iNmgVUcX55xvCQX749IfY", "Gg3ZOGnMTkHaMIOZ0OJHsig6QwU5j8Jev2RkIZML");

document.getElementById("signUpButton").addEventListener("click", signUp, false);

function signUp(event) {
  var firstName = document.getElementById("firstName").value;
  var lastName  = document.getElementById("lastName").value;
  var username  = document.getElementById("username").value;
  var email     = document.getElementById("email").value;
  var password  = document.getElementById("password").value;
  var confirm   = document.getElementById("confirmPassword").value;
  var carBrand  = document.getElementById("carBrand").value;
  var carType   = document.getElementById("carType").value;
  var carColor  = document.getElementById("carColor").value; 

  var prefDriver;
  if(document.getElementById("driver").checked) {
    prefDriver = true;
  } else if(document.getElementById("rider").checked) {
    prefDriver = false;
  } else {
    alert("Preference not checked");
    return;
  }

  if (!firstName || !lastName || !email || !password) {
    alert("Fill out all fields!");
    return;
  }

  if (!password.match(confirm)) {
    alert("Passwords don't match!");
    return;
  }

  if (password.length < 8) {
    alert("Password not long enough!");
    return;
  }

  var re = /.*@wustl\.edu$/;
  if (!email.match(re)) {
    alert("You must use your wustl email");
    return;
  }

  var user = new Parse.User();
  user.set("username", username);
  user.set("password", password);
  user.set("email", email);

  user.set("firstName", firstName);
  user.set("lastName", lastName);
  user.set("carType", carType);
  user.set("carColor", carColor);
  user.set("preference", prefDriver);
  user.signUp(null, {
  success: function(user) {
    // Hooray! Let them use the app now.
    alert("SUCCESS");
  },
  error: function(user, error) {
    // Show the error message somewhere and let the user try again.
    alert("Error: " + error.code + " " + error.message);
  }
  });
}




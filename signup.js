Parse.initialize("eamcKJmUTepWXqQzYx5iNmgVUcX55xvCQX749IfY", "Gg3ZOGnMTkHaMIOZ0OJHsig6QwU5j8Jev2RkIZML");

document.getElementById("signUpButton").addEventListener("click", signUp, false);

function signUp(event) {
  var firstName = document.getElementById("firstName").value;
  var lastName  = document.getElementById("lastName").value;
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

  //verify email and check it hasn't already been used
  var username  = "JasonLi914";
  var pass      = "eggs10430";
  var apiURL    = "http://api.verify-email.org/api.php?";

  var url       = apiURL + "usr=" + username + "&pwd=" + pass + "&check=" + email;





  if (!firstName || !lastName || !email || !password) {
    alert("Fill out all fields!");
    return;
  }

  if ()

  var re = /.*@wustl\.edu$/;
  if (!email.match(re)) {
    alert("You must use your wustl email");
    return;
  }

  var UserTable = Parse.Object.extend("Users");
  var userTable = new UserTable();

  userTable.save({FirstName: firstName,
    LastName: lastName,
    Pass: password,
    Email: email,
    CarType: carType,
    CarBrand: carBrand,
    CarColor: carColor,
    Preference: prefDriver
    }, {
      success: function(object) {
        alert("SUCCESS");
        return true;
      },
      error: function(model, error) {
        alert("FAIL");
        return false;
      }
    });

}



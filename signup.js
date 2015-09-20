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

  if (!firstName || !lastName || !email || !password) {
    alert("Fill out all fields!");
    return;
  }

  var re = /.*@wustl\.edu$/;
  if (!email.match(re)) {
    alert("You must use your wustl email");
    return;
  }

  var query = new Parse.Query("Users");
  query.equalTo("Email", email);
  query.find({
    success: function(results) {
      if (results.length == 0) {
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
            },
            error: function(model, error) {
              alert("FAIL");
            }
          });
        } else {
          alert("EMAIL ALREADY EXISTS");
        }
    }
  });
}




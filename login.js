Parse.initialize("eamcKJmUTepWXqQzYx5iNmgVUcX55xvCQX749IfY", "Gg3ZOGnMTkHaMIOZ0OJHsig6QwU5j8Jev2RkIZML");

document.getElementById("loginButton").addEventListener("click", login, false);

function login(event) {
	
  var email     = document.getElementById("email").value;
  var password  = document.getElementById("password").value;
  
  if (!email || !password) {
    alert("Fill out all fields!");
    return;
  }

  var query = new Parse.Query("Users");
  query.equalTo("Email", email);
  query.equalTo("Pass", password);
  query.find({
    success: function(results) {
      if (results.length > 0) {
      	alert("LOGIN SUCCESSFUL");
      } else {
      	alert("LOGIN FAILED");
      }
  	}
  });
}

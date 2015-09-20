Parse.initialize("eamcKJmUTepWXqQzYx5iNmgVUcX55xvCQX749IfY", "Gg3ZOGnMTkHaMIOZ0OJHsig6QwU5j8Jev2RkIZML");

document.getElementById("loginButton").addEventListener("click", login, false);

function login(event) {
	
  var username     = document.getElementById("username").value;
  var password  = document.getElementById("password").value;
  
  if (!username || !password) {
    alert("Fill out all fields!");
    return;
  }

  Parse.User.logIn(username, password, {
  success: function(user) {
    // Do stuff after successful login.
    alert("SUCCESS");
  },
  error: function(user, error) {
    // The login failed. Check error to see why.
    alert("SUCCESS");
  }
});}


var $loginBtn = $("#loginBtn");
var $signBtn = $("#signBtn");

var API = {
  getLogin: function(data) {
    return $.ajax({
      url: "/api/login",
      type: "POST",
      data: data
    });
  },
  addUser: function(data) {
    return $.ajax({
      url: "/api/signup",
      type: "POST",
      data: data
    });
  }
};

var signupSubmit = function(event) {
  event.preventDefault();
  var signupData = {
    username: $("#email-input")
      .val()
      .trim(),
    password: $("#password-input")
      .val()
      .trim(),
    family: $("#name-input")
      .val()
      .trim(),
    role: "Parent"
  };
  API.addUser(signupData).then(function() {
    $("#email-input").val("");
    $("#password-input").val("");
    $("#name-input").val();
  });
};

var loginSubmit = function(event) {
  event.preventDefault();
  var loginData = {
    username: $("#email-input")
      .val()
      .trim(),
    password: $("#password-input")
      .val()
      .trim()
  };
  if (!(loginData.username && loginData.password)) {
    alert("That was the wrong password TINY HUMAN!");
    return;
  }

  API.getLogin(loginData).then(function() {
    $("#email-input").val("");
    $("#password-input").val("");
  });
};

$loginBtn.on("click", loginSubmit);
$signBtn.on("click", signupSubmit);

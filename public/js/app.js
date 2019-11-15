var $loginBtn = $("#loginBtn");
//var $signBtn = $("#signBtn");
console.log("garbage");
//$signBtn.on("click", signupSubmit);

var API = {
  getLogin: function(data) {
    return $.ajax({
      url: "/api/login",
      type: "POST",
      data: data
    });
  }
};

var loginSubmit = function(event) {
  event.preventDefault();
  console.log("garbage");
  var loginData = {
    username: $("#email-input")
      .val()
      .trim(),
    password: $("#password-input")
      .val()
      .trim()
  };
  console.log(loginData);
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

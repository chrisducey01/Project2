var $loginBtn = $("#loginBtn");
var $signBtn = $("#signBtn");
var $btnAdd = $("#btnAdd");
var $addaKid = $("#addaKid");

var API = {
  getLogin: function(data) {
    return $.ajax({
      url: "/api/login",
      type: "POST",
      data: data
    });
  },
  addParent: function(data) {
    return $.ajax({
      url: "/api/signup",
      type: "POST",
      data: data
    });
  },
  addKid: function(data) {
    return $.ajax({
      url: "/api/addUser",
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
  API.addParent(signupData).then(function() {
    $("#email-input").val("");
    $("#password-input").val("");
    $("#name-input").val();
    window.location.href = "/login";
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

  API.getLogin(loginData).then(function(data) {
    if (data.role === "Parent") {
      window.location.href = "/parents";
    } else if (data.role === "Child") {
      window.location.href = "/kids";
    }
  });
};

var kidSignup = function(event) {
  event.preventDefault();
  var kidsignupData = {
    username: $("#kidname-input")
      .val()
      .trim(),
    password: $("#kidpassword-input")
      .val()
      .trim(),
    role: "Child",
    FamilyId: $("#btnAdd").data("familyid")
  };
  API.addKid(kidsignupData).then(function() {
    $("#kidname-input").val("");
    $("#kidpassword-input").val("");
    window.location.href = "/parents";
  });
};

var gotoPage = function() {
  window.location.href = "/kidsSignUp";
};

$loginBtn.on("click", loginSubmit);
$signBtn.on("click", signupSubmit);
$btnAdd.on("click", kidSignup);
$addaKid.on("click", gotoPage);

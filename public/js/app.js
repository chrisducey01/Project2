var $loginBtn = $("#loginBtn");
var $signBtn = $("#signBtn");
var $btnAdd = $("#btnAdd");
var $addaKid = $("#addaKid");
var $logout = $("#logout");
var $btnChoreAdd = $("#button-addon2");
var $btnChoreStatus = $(".chore-status");
//var $btnChoreDelete = $("#btnChoreDelete");
var $kidBtn = $(".kidBtn");

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
  },
  logOut: function() {
    return $.ajax({
      url: "/api/logout",
      type: "GET"
    });
  },
  addChore: function(data) {
    return $.ajax({
      url: "/api/chore",
      method: "POST",
      data: data
    });
  },
  choreStat: function() {
    return $.ajax({
      method: "PUT",
      url: "/api/chore",
      data: choreObj
    });
  },
  viewKid: function(data) {
    console.log(data);
    return $.ajax({
      method: "GET",
      url: "/parentschore",
      data: { UserId: data.childId }
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

var logoutUser = function() {
  API.logOut().then(function() {
    window.location.href = "/login";
  });
};

var choreStatus = function() {
  var day = $(this).data("day");
  var state = $(this).data("state");
  var updatedStatus;

  if (state === "checked") {
    updatedStatus = false;
    $(this).data("state", "unchecked");
  } else {
    updatedStatus = true;
    $(this).data("state", "checked");
  }

  var choreObj = { id: $(this).data("chore-id") };
  if (day === "monday") {
    choreObj.monday = updatedStatus;
  }
  if (day === "tuesday") {
    choreObj.tuesday = updatedStatus;
  }
  if (day === "wednesday") {
    choreObj.wednesday = updatedStatus;
  }
  if (day === "thursday") {
    choreObj.thursday = updatedStatus;
  }
  if (day === "friday") {
    choreObj.friday = updatedStatus;
  }
  API.choreStat(choreObj);
};

var choreAdd = function(event) {
  event.preventDefault();
  var choreData = {
    task: $("#task-input")
      .val()
      .trim(),
    UserId: $("#button-addon2").data("userid"),
    description: " ",
    difficultyRating: 1
  };
  API.addChore(choreData).then(function() {
    $("#task-input").val("");
    window.location.href = "/parentschore";
  });
};

var viewChores = function() {
  var kidsData = {
    childId: $(".kidBtn").data("child-id")
  };
  API.viewKid(kidsData);
};

$loginBtn.on("click", loginSubmit);
$signBtn.on("click", signupSubmit);
$btnAdd.on("click", kidSignup);
$addaKid.on("click", gotoPage);
$logout.on("click", logoutUser);
$btnChoreStatus.on("click", choreStatus);
$btnChoreAdd.on("click", choreAdd);
$kidBtn.on("click", viewChores);

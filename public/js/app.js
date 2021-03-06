var $loginBtn = $("#loginBtn");
var $signBtn = $("#signBtn");
var $btnAdd = $("#btnAdd");
var $addaKid = $("#addaKid");
var $logout = $("#logout");
var $btnChoreAdd = $("#button-addon2");
var $btnChoreStatus = $(".chore-status");
var $btnChoreDelete = $(".btnChoreDelete");
var $kidBtn = $(".kidBtn");
var $goBack = $("#back");

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
  choreStat: function(choreObj) {
    return $.ajax({
      method: "PUT",
      url: "/api/chore",
      data: choreObj
    });
  },
  viewKid: function(data) {
    window.location.href = "/parentschore/" + data.childId;
  },
  deleteChore: function(data) {
    return $.ajax({
      method: "DELETE",
      url: "/api/chore",
      data: data
    });
  }
};

function failedLogin() {
  let failed = document.getElementById("wrong");
  if (failed.style.display === "none") {
    failed.style.display = "block";
  } else {
    failed.style.display = "none";
  }
}

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
    failedLogin();
    return;
  }
  API.getLogin(loginData).then(
    function(data) {
      console.log("hello");
      if (data.role === "Parent") {
        window.location.href = "/parents";
      } else if (data.role === "Child") {
        window.location.href = "/kids";
      }
    },
    function(e) {
      console.error(e);
      failedLogin();
    }
  );
  return;
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

var choreStatus = function(btn) {
  var day = btn.data("day");
  var state = btn.data("state");
  var updatedStatus;

  if (state === "checked") {
    updatedStatus = false;
    btn.data("state", "unchecked");
  } else {
    updatedStatus = true;
    btn.data("state", "checked");
  }

  var choreObj = { id: btn.data("chore-id") };
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
  var userid = $("#button-addon2").data("user-id");
  var choreData = {
    task: $("#task-input")
      .val()
      .trim(),
    UserId: userid,
    description: " ",
    difficultyRating: 1
  };
  API.addChore(choreData).then(function() {
    $("#task-input").val("");
    window.location.href = "/parentschore/" + userid;
  });
};

var viewChores = function(btn) {
  var kidsData = {
    childId: btn.data("child-id")
  };
  API.viewKid(kidsData);
};

var deleteChore = function(btn) {
  var choreData = {
    id: btn.data("chore-id")
  };
  API.deleteChore(choreData)
    .then(function(res) {
      console.log(res);
      location.reload();
    })
    .catch(function(err) {
      console.log(err);
    });
};

var goBack = function() {
  window.location.href = "/parents";
};

$loginBtn.on("click", loginSubmit);
$signBtn.on("click", signupSubmit);
$btnAdd.on("click", kidSignup);
$addaKid.on("click", gotoPage);
$logout.on("click", logoutUser);
$btnChoreDelete.on("click", function() {
  var btn = $(this);
  deleteChore(btn);
});
$btnChoreStatus.on("click", function() {
  var btn = $(this);
  choreStatus(btn);
});
$btnChoreAdd.on("click", choreAdd);
$kidBtn.on("click", function() {
  var btn = $(this);
  viewChores(btn);
});
$goBack.on("click", goBack);

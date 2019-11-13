var $loginBtn = $("#loginBtn");
var $signBtn = $("#signBtn");

$signBtn.on("click", signupSubmit);
$loginBtn.on("click", loginSubmit);

var API = {
  getLogin: function() {
    return $.ajax({
      url: "api/login",
      type: "POST"
    });
  }
};

var loginSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveLogin(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

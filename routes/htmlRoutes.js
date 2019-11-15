// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load signup page
  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  // Load login page
  app.get("/login", function(req, res) {
    res.render("login");
  });

  // Load parents page once authenticated
  app.get("/parents", isAuthenticated, function(req, res) {
    res.render("parents");
  });

  // Load kids page once authenticated
  app.get("/kids", isAuthenticated, function(req, res) {
    res.render("kids");
  });

  // Redirect to login page
  app.get("/", function(req, res) {
    res.redirect("/login");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

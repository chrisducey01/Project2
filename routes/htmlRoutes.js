// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
var db = require("../models");

module.exports = function(app) {
  // Load signup page
  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  // Load login page
  app.get("/login", function(req, res) {
    if (req.user) {
      if (req.user.role === "Parent") {
        res.redirect("/parents");
      } else if (req.user.role === "Child") {
        res.redirect("/kids");
      } else {
        res.render("404");
      }
    } else {
      res.render("login");
    }
  });

  // Load parents page once authenticated
  app.get("/parents", isAuthenticated, function(req, res) {
    res.render("parents");
  });

  // Load kids page once authenticated
  app.get("/kids", isAuthenticated, function(req, res) {
    db.Chore.findAll({ where: { UserId: req.user.id } })
      .then(function(dbRes) {
        console.log(req.user);
        console.log(dbRes);
        res.render("kids2", { chores: dbRes });
      })
      .catch(function() {
        console.log("Error getting data from database");
      });
  });

  app.get("/kidsSignUp", isAuthenticated, function(req, res) {
    res.render("kidsSignUp", { FamilyId: req.user.FamilyId });
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

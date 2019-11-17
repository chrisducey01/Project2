// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
var db = require("../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

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
    // Find all the kids related to that parent to display on the page
    db.User.findAll({
      where: { FamilyId: req.user.FamilyId, id: { [Op.ne]: req.user.id } }
    })
      .then(function(dbUsers) {
        console.log(dbUsers);
        res.render("parents", { kids: dbUsers });
      })
      .catch(function(err) {
        console.log(err);
        res.status(400).json({ message: "Error retrieving kids from db." });
      });
  });

  // Load kids page once authenticated
  app.get("/kids", isAuthenticated, function(req, res) {
    db.Chore.findAll({ where: { UserId: req.user.id } })
      .then(function(dbRes) {
        console.log(req.user);
        console.log(dbRes);
        res.render("kids2", { chores: dbRes });
      })
      .catch(function(err) {
        console.log(err);
        res.status(500).json({ message: "Error getting data from database" });
      });
  });

  app.get("/kidsSignUp", isAuthenticated, function(req, res) {
    res.render("kidsSignUp", { FamilyId: req.user.FamilyId });
  });

  app.get("/parentschore", isAuthenticated, function(req, res) {
    console.log(req);
    db.Chore.findAll({ where: { UserId: Number(req.query.UserId) } })
      .then(function(dbRes) {
        console.log(dbRes);
        res.render("parentschore", { chores: dbRes, UserId: req.body.id });
      })
      .catch(function(err) {
        console.log(err);
        res.status(500).json({ message: "Error getting data from database" });
      });
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

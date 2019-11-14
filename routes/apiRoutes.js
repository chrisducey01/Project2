var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Sign-up a new user
  app.post("/api/signup", function(req, res) {
    username = req.body.username;
    password = req.body.password;
    family = req.body.family;
    role = req.body.role;

    if (!username) {
      return res
        .status(400)
        .json({ message: "username not passed in on request." });
    }
    if (!password) {
      return res
        .status(400)
        .json({ message: "password not passed in on request." });
    }
    if (!family) {
      return res
        .status(400)
        .json({ message: "family not passed in on request." });
    }
    if (!role) {
      return res
        .status(400)
        .json({ message: "role not passed in on request." });
    }

    //First create the new family and retrieve the family id
    db.Family.create({ name: family }).then(function(family) {
      //Then create the new user
      db.User.create({
        name: username,
        password: password,
        role: role,
        FamilyId: family.id
      })
        .then(function(user) {
          res.json({ id: user.id });
        })
        .catch(function(err) {
          console.log(err);
          res.status(400).json({ message: "User already exists." });
        });
    });
  });

  // Login an existing user and differentiate if it is a parent or a kid
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    if (req.user.role === "Parent") {
      res.redirect(307, "/parents");
    } else {
      res.redirect(307, "/kids");
    }
  });

  // Route for logging user out
  app.get("/api/logout", function(req, res) {
    if (!req.user) {
      return res.status(401).end();
    }
    req.logout();
    res.status(200).end();
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};

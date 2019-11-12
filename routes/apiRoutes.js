var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Sign-up a new user
  app.post("/api/signup", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const family = req.body.family;
    const role = req.body.role;

    if (!username) {
      return res.status(400).json({ message: "username not passed in on request." });
    }
    if (!password) {
      return res.status(400).json({ message: "password not passed in on request." });
    }
    if (!family) {
      return res.status(400).json({ message: "family not passed in on request." });
    }
    if (!role) {
      return res.status(400).json({ message: "role not passed in on request." });
    }

    //First create the new family and retrieve the family id
    db.Family.create({ name: family }).
      then(function (family) {
        //Then create the new user
        db.User.create({
          name: username,
          password: password,
          role: role,
          FamilyId: family.id
        }).
          then(function (user) {
            res.json({id: user.id});
          });
      });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};

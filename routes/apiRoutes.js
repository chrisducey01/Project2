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
          if (err.errors[0].validatorKey === "isEmail") {
            return res
              .status(400)
              .json({ message: "Username must be an email address." });
          } else if (err.errors[0].validatorKey === "not_unique") {
            return res.status(400).json({ message: "User already exists." });
          }
          res.status(400).json({ message: "Unable to register user." });
        });
    });
  });

  // Adding a new user while logged in
  app.post("/api/addUser", function(req, res) {
    // If not logged in, return error and do not add new user
    if (!req.user) {
      return res.status(401).json({
        message:
          "Unauthorized.  Must sign in before adding a user to your account."
      });
    }
    username = req.body.username;
    password = req.body.password;
    FamilyId = req.body.FamilyId;
    role = req.body.role;

    // Check that needed variables were passed in the request body
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
    if (!FamilyId) {
      return res
        .status(400)
        .json({ message: "family ID not passed in on request." });
    }
    if (!role) {
      return res
        .status(400)
        .json({ message: "role not passed in on request." });
    }
    //Then create the new user
    db.User.create({
      name: username,
      password: password,
      role: role,
      FamilyId: FamilyId
    })
      .then(function(user) {
        res.json({ id: user.id });
      })
      .catch(function(err) {
        console.log(err);
        res.status(400).json({ message: "User already exists." });
      });
  });

  // Login an existing user and differentiate if it is a parent or a kid
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.status(200).json({
      user: req.user.id,
      name: req.user.name,
      familyId: req.user.FamilyId,
      role: req.user.role
    });
  });

  // Register a new chore
  app.post("/api/chore", function(req, res) {
    if (!req.user) {
      return res.status(401).json({
        message:
          "Unauthorized.  Must sign in before adding a user to your account."
      });
    }

    task = req.body.task;
    description = req.body.description;
    difficultyRating = req.body.difficultyRating;
    monday = req.body.monday;
    tuesday = req.body.tuesday;
    wednesday = req.body.wednesday;
    thursday = req.body.thursday;
    friday = req.body.friday;
    UserId = req.body.UserId;

    if (!task) {
      return res
        .status(400)
        .json({ message: "task not passed in on request." });
    }
    if (!description) {
      return res
        .status(400)
        .json({ message: "description not passed in on request." });
    }
    if (!difficultyRating) {
      return res
        .status(400)
        .json({ message: "difficultyRating not passed in on request." });
    }
    //Then create the new chore
    db.Chore.create({
      task: task,
      description: description,
      difficultyRating: difficultyRating,
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      UserId: UserId
    })
      .then(function(task) {
        res.json({ id: task.id });
      })
      .catch(function(err) {
        console.log(err);
        res.status(400).json({ message: "Task already exists." });
      });
  });

  // Route for logging user out
  app.get("/api/logout", function(req, res) {
    if (!req.user) {
      return res.status(401).end();
    }
    req.logout();
    res.status(200).end();
  });

  // POST route for saving a new reward
  // Register a new chore
  app.post("/api/reward", function(req, res) {
    name = req.body.name;
    points = req.body.points;
    FamilyId = req.body.FamilyId;

    if (!name) {
      return res
        .status(400)
        .json({ message: "name not passed in on request." });
    }
    if (!points) {
      return res
        .status(400)
        .json({ message: "points not passed in on request." });
    }
    //Then create the new reward
    db.Reward.create({
      name: name,
      points: points,
      FamilyId: FamilyId
    })
      .then(function(name) {
        res.json({ id: name.id });
      })
      .catch(function(err) {
        console.log(err);
        res.status(400).json({ message: "Reward already exists." });
      });
  });

  // PUT route for updating chores
  app.put("/api/chore", function(req, res) {
    db.Chore.update(req.body, {
      where: {
        id: req.body.id
      },
      returning: true,
      plain: true
    })
      .then(function(rowUpdated) {
        db.Chore.findOne({ where: { id: req.body.id } }).then(function(dbRow) {
          res.json(dbRow);
          console.log(rowUpdated);
        });
      })
      .catch(function(updatedChore) {
        res.json(updatedChore);
      });
  });

  // Delete a chore by id
  app.delete("/api/chore", function(req, res) {
    db.Chore.destroy({ where: { id: req.body.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });

    // Delete a kid by id
    app.delete("/api/user", function(req, res) {
      db.User.destroy({ where: { id: req.body.id } }).then(function(
        dbExample
      ) {
        res.json(dbExample);
      });
    });
};

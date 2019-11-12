var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

passport.use(
  new LocalStrategy(function(username, password, done) {
    db.User.findOne({
      where: { name: username }
    }).then(function(dbUser) {
      if (!dbUser) {
        return done(null, false, { message: "User does not exist." });
      } else if (!dbUser.validPassword(password)) {
        return done(null, false, { message: "Invalid password." });
      }
      return done(null, dbUser);
    });
  })
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;

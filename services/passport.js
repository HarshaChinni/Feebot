const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      console.log("acess token: ", accessToken);
      console.log("refresh token", refreshToken);
      console.log("profile", profile);
      User.findOne({ googleID: profile.id }).then(existingUser => {
        // existingUser ? "" : new User({ googleID: profile.id }).save();
        if (existingUser) {
          //User details already exists in the DB
          done(null, existingUser);
        } else {
          new User({ googleID: profile.id }).save().then(user => {
            done(null, user);
          });
        }
      });
    }
  )
);

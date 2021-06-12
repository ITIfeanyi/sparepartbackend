const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/Userschema");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user.id);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://pure-depths-31131.herokuapp.com/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ googleID: profile.id }).then((currentUser) => {
        if (currentUser) {
          done(null, currentUser);
        } else {
          //checks if user actually verified the email
          if (profile._json.email_verified) {
            const newUser = new User({
              googleID: profile.id,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              email: profile._json.email,
            });
            newUser.save().then((newUser) => {
              console.log(newUser);
              done(null, newUser);
            });
          } else {
            console.log("User not auth by google");
          }
        }
      });
    }
  )
);

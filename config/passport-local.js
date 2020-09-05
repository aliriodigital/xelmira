const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = User.findById(id);
  done(null, user);
});

passport.use(
  "localSignup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const newUser = new User();

      const user = User.findOne({ email: email });
      if (user) {
        return done(
          null,
          false,
          req.flash("errorMsg", "Email is already taken!")
        );
      } else if (password !== req.body.confirmPassword) {
        return done(
          null,
          false,
          req.flash(
            "errorMsg",
            "Password and confirm password must be the same"
          )
        );
      } else {
        newUser.name = req.body.name;
        newUser.email = email;
        newUser.password = password;
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        done(null, newUser);
      }
    }
  )
);

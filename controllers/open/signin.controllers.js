const User = require("../../models/User");
const passport = require("passport");

const controllers = {};

controllers.signinForm = (req, res) => {
  res.render("open/signinForm", {
    bodyBg: true,
  });
};

controllers.signin = passport.authenticate("local", {
  failureRedirect: "/signin",
  successRedirect: "/",
  failureFlash: true,
});

controllers.logout = (req, res) => {
  req.logout();
  req.flash("successMsg", "You are logged out!");
  res.redirect("/signin");
}

module.exports = controllers;

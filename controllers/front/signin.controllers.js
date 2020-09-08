const User = require("../../models/User");
const passport = require("passport");

const controllers = {};

controllers.signinForm = (req, res) => {
  res.render("front/signinForm", {
    layout: "front",
    pageTitle: "Login",
    bodyBg: true,
  });
};

controllers.signin = passport.authenticate("local", {
  failureRedirect: "/signin",
  successRedirect: "/courses",
  failureFlash: true,
});

controllers.logout = (req, res) => {
  req.logout();
  req.flash("successMsg", "You are logged out!");
  res.redirect("/signin");
}

module.exports = controllers;

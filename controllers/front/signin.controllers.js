const User = require("../../models/User");
const passport = require("passport");
require("dotenv").config();
const { gSiteKey, gSecretKey } = process.env;
const controllers = {};

controllers.signinForm = (req, res) => {
  res.render("front/signinForm", {
    layout: "front",
    pageTitle: "Login",
    bodyBg: true,
    gSiteKey: gSiteKey,
  });
};

controllers.signin = passport.authenticate("local", {
  failureRedirect: "/signin",
  successRedirect: "/user/profile",
  gSiteKey: gSiteKey,
  failureFlash: true,
});

controllers.logout = (req, res) => {
  req.logout();
  req.flash("successMsg", "You are logged out!");
  res.redirect("/signin");
};

module.exports = controllers;

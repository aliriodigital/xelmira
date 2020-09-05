const User = require("../../models/User");
const controllers = {};

controllers.signinForm = (req, res) => {
  res.render("open/signinForm", {
    bodyBg: true,
  });
};

controllers.signin = (req, res) => {
  res.send("Login form is working.");
}

module.exports = controllers;

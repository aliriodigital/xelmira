const User = require("../../models/User");
const Role = require("../../models/Role");
const School = require("../../models/School");
const controllers = {};
require("dotenv").config();
const { gSiteKey, gSecretKey } = process.env;

controllers.signupForm = (req, res) => {
  res.render("front/signupForm", {
    layout: "front",
    pageTitle: "Signup",
    bodyBg: true,
    gSiteKey: gSiteKey,
  });
};

controllers.signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const mailInUse = await User.findOne({ email: email });
  let error = "";
  if (password.length < 4) {
    error = "Password must be longer than 3 characters and try again";
  }
  if (password !== confirmPassword) {
    error = "Password and confirm password must match";
  }
  if (mailInUse) {
    error = "Email is already taken. Please enter another email";
  }
  if(email.length < 1) {
    error = "Please enter an email and try again";
  }
  if(name.length < 1) {
    error = "Please enter a name and try again"
  }
  if (error.length > 0) {
    res.render("front/signupForm", {
      error: error,
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });
  } else {
    const schoolDoc = new School({});
    schoolDoc.name = "";
    schoolDoc.description = "";
    await schoolDoc.save();

    const user = new User(req.body);
    user.password = await user.encryptPassword(password);
    const role = await Role.findOne({name: "admin"});
    user.role = role.name;
    user.school = schoolDoc.id;
    user.sessionUser = "_tenant";
    await user.save();
    req.flash("success", "Congrats! Your registration was done.");
    res.redirect("/signin");
  }
};

module.exports = controllers;

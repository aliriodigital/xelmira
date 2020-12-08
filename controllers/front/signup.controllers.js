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
<<<<<<< HEAD
    const addSchool = new School({});
    addSchool.name = "";
    addSchool.description = "";
    await addSchool.save();
=======
    const newSchool = new School({});
    newSchool.name = "";
    newSchool.description = "";
    await newSchool.save();
>>>>>>> 872e84a05c07b0dd3cb50e27fb96a57ba3fb8e49

    const user = new User(req.body);
    user.password = await user.encryptPassword(password);
    const role = await Role.findOne({name: "admin"});
    user.role = role.name;
<<<<<<< HEAD
    user.school = addSchool.id;
=======
    user.school = newSchool.id;
>>>>>>> 872e84a05c07b0dd3cb50e27fb96a57ba3fb8e49
    user.creatorUser = "_tenant";
    await user.save();
    req.flash("success", "Congrats! Your registration was done.");
    res.redirect("/signin");
  }
};

module.exports = controllers;

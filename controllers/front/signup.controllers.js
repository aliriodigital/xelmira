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
  const { 
    name,
    school,
    email, 
    username,
    password, 
    confirmPassword,
  } = req.body;

  const usernameInUse = await User.findOne({ username: username });
  const schoolInUse = await School.findOne({name: school.toLowerCase()});
  let error = "";
  if (password.length < 4) error = "Password must be longer than 3 characters";
  if (password !== confirmPassword) error = "Password and confirm password must match";
  if (username === "") error = "Enter a username";
  if (usernameInUse) error = "Username already taken. Enter another username";
  if (email === "") error = "Enter an email";
  if (school === "") error = "Enter a school name";
  if (schoolInUse) error = "School already taken. Try another school.";
  if (name === "") error = "Enter a name";
  if (error.length > 0) {
    res.render("front/signupForm", {
      layout: "front",
      error: error,
      name: name,
      school: school,
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    });
  } else {
    const addSchool = new School({});
    addSchool.name = school;
    addSchool.description = "";
    await addSchool.save();

    const user = new User(req.body);
    user.name = name;
    user.username = username;
    user.password = await user.encryptPassword(password);
    user.role = "admin";
    user.school = addSchool._id;
    user.creatorUser = "_tenant";
    await user.save();
    req.flash("success", "Congrats! Your registration is done.");
    res.redirect("/signin");
  }
};

module.exports = controllers;

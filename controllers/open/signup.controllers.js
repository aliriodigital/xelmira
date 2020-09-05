const User = require("../../models/User");
// const passport = require("passport");
const controllers = {};

controllers.signupForm = (req, res) => {
  res.render("open/signupForm", {
    bodyBg: true,
  });
};

controllers.signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  let errorMsg = "";
  const mailInUse = await User.findOne({ email: email });
  if (mailInUse) {
    errorMsg = "Email is already taken";
  }
  if (password !== confirmPassword) {
    errorMsg = "Password and confirm password must match";
  }
  if (password.length < 4) {
    errorMsg = "Password must be longer than 4 characters";
  }
  if (errorMsg.length > 0) {
    res.render("open/signupForm", {
      errorMsg: errorMsg,
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });
  } else {
    const user = new User(req.body);
    user.password = await user.encryptPassword(password);
    await user.save();
    req.flash("successMsg", "Congrats! Your registration was done.");
    res.redirect("/signin");
  }
};

module.exports = controllers;

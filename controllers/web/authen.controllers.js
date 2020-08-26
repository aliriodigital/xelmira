const User = require("../../models/User");
const controllers = {};

controllers.signupForm = (req, res) => {
  res.render("pages/web/signupForm", {
    layout: "web",
    bodyBg: true,
  });
};

controllers.signup = (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  const errors = [];
  if (password !== confirmPassword) {
    errors.push({ text: "Passwords do not match." });
  }
  if (password.length <= 4) {
    errors.push({ text: "Password must be, at least, 4 characters" });
  }

  if (errors.length > 0) {
    res.render("pages/web/signupForm", {
      layout: "web",
      errors: errors,
      username: username,
      email: email,
    });
  } else {
    res.send("Registration was successful");
  }
  // const user = new User(req.body);
  // user.save();
  // console.log(req.body);
  // req.flash("successMsg", "Well done! You have been registered successfully.");
  // res.redirect("pages/web/signupForm");
};

controllers.signinForm = (req, res) => {
  res.render("pages/web/signin", {
    layout: "web",
    bodyBg: true,
  });
};

module.exports = controllers;

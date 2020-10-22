const User = require("../../models/User");
const { trim } = require("../../utils/formatString");
const controllers = {};

controllers.read = async (req, res) => {
  const users = await User.find({ user: req.user.id }).lean();
  res.render("users/users", {
    pageTitle: "Manage Users",
    userLink: true,
    users: users,
  });
};

controllers.createForm = (req, res) => {
  res.render("users/user-new", {
    pageTitle: "New User",
  });
};

controllers.create = async (req, res) => {
  const { name, email, password } = req.body;
  let error = "";
  if (password.length < 1) {
    error = "Please enter a password and try again";
  }
  if (email.length < 1) {
    error = "Please enter an email and try again";
  }
  if (name.length < 1) {
    error = "Please enter a name and try again";
  }
  if (error.length > 0) {
    res.render("users/user-new", {
      error: error,
      name: name,
      email: email,
      password: password,
    });
  } else {
    const user = await new User(req.body);
    user.name = trim(name);
    user.email = trim(email);
    user.password = await user.encryptPassword(password);
    user.user = req.user.id;
    user.save();
    res.redirect("/users");
  }
};

controllers.updateForm = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).lean();
  res.render("users/user-edit", {
    pageTitle: "Edit User",
    user: user,
  });
};

controllers.update = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  let error = "";
  if (password.length < 1) {
    error = "Please enter a password and try again";
  }
  if (email.length < 1) {
    error = "Please enter an email and try again";
  }
  if (name.length < 1) {
    error = "Please enter a name and try again";
  }
  if (error.length > 0) {
    req.session.name = name;
    req.session.email = email;
    req.session.password = password;
    req.flash("error", error);
    res.redirect("/user/edit/" + id);
  } else {
    const user = await User.findById(id);
    user.name = trim(name);
    user.email = trim(email);
    user.password = await user.encryptPassword(password);
    user.save();
    res.redirect("/users");
  }
};

controllers.remove = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id });
  user.remove();
  res.redirect("/users");
};

module.exports = controllers;

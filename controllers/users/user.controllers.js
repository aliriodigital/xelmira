const User = require("../../models/User");
const Role = require("../../models/Role");
const School = require("../../models/School");

const controllers = {};

controllers.read = async (req, res) => {
  const users = await User.find({ school: req.user.school }).lean();
  res.render("users/users", {
    pageTitle: "Manage Users",
    userLink: true,
    users: users,
  });
};

controllers.createView = async (req, res) => {
  const role = await Role.find().lean();
  res.render("users/user-new", {
    pageTitle: "New User",
    featureTitle: "Create User",
    action: "/user/new",
    userLink: true,
    roles: role,
  });
};

controllers.create = async (req, res) => {
  const { name, email, username, password, role } = req.body;
  const usernameInUse = await User.findOne({ username: username });
  let error = "";
  if (email === "") error = "Enter an email";
  if (usernameInUse)
    error = "Username already taken. Try a different username.";
  if (username === "") error = "Enter a username";
  if (password.length < 4) error = "Enter a password longer than 3 characters";
  if (role === "Select a role") error = "Select a role";
  if (name === "") error = "Enter a name.";
  if (error.length > 0) {
    res.render("users/user-new", {
      pageTitle: "New User",
      featureTitle: "Create User",
      userLink: true,
      error: error,
      name: name,
      email: email,
      username: username,
      password: password,
      role: role,
    });
  } else {
    const user = await new User(req.body);
    user.name = name;
    user.school = req.user.school;
    user.email = email;
    user.username = username;
    user.password = await user.encryptPassword(password);
    user.creatorUser = req.user.id;
    user.role = role;
    user.save();
    res.redirect("/users");
  }
};

controllers.editView = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).lean();
  const roles = await Role.find().lean();
  if (!user || user.school.toString() !== req.user.school.toString()) {
    req.flash("error", "You can not view this route");
    res.redirect("/users");
  } else {
    res.render("users/user-edit", {
      pageTitle: "Edit User",
      featureTitle: "Edit User",
      action: "/user/edit/" + id,
      user: user,
      roles: roles,
    });
  }
};

controllers.edit = async (req, res) => {
  const { id } = req.params;
  const { name, email, username, password, role } = req.body;
  const user = await User.findById(id);
  const usernameInUse = await User.findOne({
    username: username,
    _id: { $ne: id },
  });
  let error = "";
  if (email === "") error = "Enter an email";
  if (usernameInUse)
    error = "Username already taken. Try a different username.";
  if (username === "") error = "Enter a username";
  if (password.length < 4) error = "Enter a password longer than 3 characters";
  if (role === "Select a role") error = "Select a role";
  if (name === "") error = "Enter a name.";
  if (error.length > 0) {
    req.flash("error", error);
    res.redirect("/user/edit/" + id);
  } else {
    if (!user || user.school.toString() !== req.user.school.toString()) {
      req.flash("error", "You can not view this route.");
      res.redirect("/users");
    } else {
      user.password = await user.encryptPassword(password);
      (user.username = username), (user.name = name);
      user.email = email;
      user.role = role;
      user.save();
      res.redirect("/users");
    }
  }
};

controllers.remove = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user || user.school.toString() !== req.user.school.toString()) {
    req.flash("error", "You can not view this route");
    res.redirect("/users");
  } else {
    user.remove();
    res.redirect("/users");
  }
};

module.exports = controllers;

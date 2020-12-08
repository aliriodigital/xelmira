const User = require("../../models/User");
const Role = require("../../models/Role");

const controllers = {};

controllers.read = async (req, res) => {
  const users = await User.find({ school: req.user.school }).lean();
  res.render("users/users", {
    pageTitle: "Manage Users",
    userLink: true,
    users: users,
  });
};

controllers.createForm = async (req, res) => {
  const role = await Role.find().lean();
  res.render("users/user-new", {
    pageTitle: "New User",
    roles: role,
  });
};

controllers.create = async (req, res) => {
  const { name, email, password, role } = req.body;
  const mailInUse = await User.findOne({ email: email });
  let error = "";
  if (password.length < 4) {
    error = "Please enter a password longer than 3 characters and try again";
  }
  if (role === "Select a role") {
    error = "Please select a role and try again"
  }
  if (mailInUse) {
    error = "Email already taken. Please enter another email"
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
      role: role,
    });
  } else {
    const user = await new User(req.body);
    user.name = name;
    user.email = email;
    user.school = req.user.school;
    user.password = await user.encryptPassword(password);
    user.creatorUser = req.user.id;
    user.role = role;
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
    user.password = await user.encryptPassword(password);
    user.name = name;
    user.email = email;
    user.save();
    res.redirect("/users");
  }
};

controllers.remove = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id });
  await isInSchool(req, res, user);
  user.remove();
  res.redirect("/users");
};

module.exports = controllers;

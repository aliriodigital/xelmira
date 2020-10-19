const User = require("../../models/User");
const controllers = {};

controllers.read = async (req, res) => {
  const users = await User.find().lean();
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
    const user = await new User(req.body);
    user.password = await user.encryptPassword(password);
    user.save();
    res.redirect("/users");
  };

controllers.updateForm = async(req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).lean();
  res.render("users/user-edit", {
    pageTitle: "Edit User",
    user: user,
  });
};

controllers.update = async(req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const user = await User.findById(id);
  user.name = name;
  user.email = email;
  user.password = await user.encryptPassword(password);
  user.save();
  res.redirect("/users");
};

controllers.remove = async(req, res) => {
  const { id } = req.params;
  const user = await User.findById({_id: id});
  user.remove();
  res.redirect("/users");
};

module.exports = controllers;

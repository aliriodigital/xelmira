const User = require("../models/user.model");

module.exports = {
  homeUser: async (req, res) => {
    const user = await User.find().lean();
    res.render("user", {
      dataCrud: user,
      userMenu: true,
      pageTitle: "Manage User",
      contentTitle: 'Manage Users',
      newCrudButton: 'New User',
      newCrudTitleModal: 'Create New User',
      viewCrudTitleModal: 'View User Details',
      updateCrudTitleModal: 'Edit User',
      deleteCrudTitleModal: 'Delete User'
    });
  },
  addUser: async (req, res) => {
    const { username, password,userRol } = req.body;
    const user = new User(req.body);
    await user.save();
    res.redirect("/user");
  },
  editUser: async (req, res) => {
    const { id } = req.params;
    const { username, password, createdAt, updatedAt } = req.body;
    user = await User.findById({ _id: id });
    user.username = username;
    user.password = password;
    await user.save();
    res.redirect("/user");
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;
    await User.remove({ _id: id });
    res.redirect("/user");
  }
};

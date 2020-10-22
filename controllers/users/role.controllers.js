const Role = require("../../models/Role");
const { trim } = require("../../utils/formatString");
const controllers = {};

controllers.read = async (req, res) => {
  const roles = await Role.find().lean();
  res.render("users/roles", {
    pageTitle: "Manage Roles",
    roleLink: true,
    roles: roles,
  });
};

controllers.createForm = (req, res) => {
  res.render("users/role-new", {
    pageTitle: "New Role",
  });
};

controllers.create = async (req, res) => {
  const { name, description } = req.body;
  if (name.length < 1) {    
    error = "Please enter a name and try again";
    res.render("users/role-new", {
      name: name,
      description: description,
      error: error,
    });
  } else {
    const role = await new Role(req.body);
    role.name = trim(name);
    role.description = trim(description);
    role.save();
    res.redirect("/roles");
  }
};

controllers.updateForm = async (req, res) => {
  const { id } = req.params;
  const role = await Role.findById(id).lean();
  res.render("users/role-edit", {
    pageTitle: "Edit Role",
    role: role,
  });
};

controllers.update = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  if (name.length < 1) {
    error = "Please enter a password and try again";
    req.session.name = name;
    req.session.description = email;
    req.flash("error", error);
    res.redirect("/role/edit/" + id);
  } else {
    const role = await Role.findById(id);
    role.name = trim(name);
    role.description = trim(description);
    role.save();
    res.redirect("/roles");
  }
};

controllers.remove = async (req, res) => {
  const { id } = req.params;
  const role = await Role.findById({ _id: id });
  role.remove();
  res.redirect("/roles");
};

module.exports = controllers;

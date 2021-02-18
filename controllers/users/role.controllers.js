const { count } = require("../../models/Role");
const Role = require("../../models/Role");
const User = require("../../models/User");
const { presetRoleInUse } = require("../../utils/presetRoleInUse");
const controllers = {};

controllers.read = async (req, res) => {
  const roles = await Role.find({ school: req.user.school }).lean();
  res.render("users/roles", {
    pageTitle: "Manage Roles",
    roleLink: true,
    roles: roles,
  });
};

controllers.createView = (req, res) => {
  res.render("users/role-new", {
    pageTitle: "New Role",
    roleLink: true,
  });
};

controllers.create = async (req, res) => {
  const { name, description } = req.body;
  const roleInUse = await Role.findOne({
    school: req.user.school,
    name: name.toLowerCase(),
  });
  if (name.length < 1) {
    error = "Please enter a name and try again";
    res.render("users/role-new", {
      name: name,
      description: description,
      error: error,
    });
  } else if (roleInUse || presetRoleInUse(name)) {
    req.flash("error", `${name} is already in use. Please try a different name`);
    res.redirect("/role/new");
  } else {
    const role = await new Role(req.body);
    role.name = name;
    role.description = description;
    role.school = req.user.school;
    role.creatorUser = req.user.id;
    role.save();
    res.redirect("/roles");
  }
};

controllers.editView = async (req, res) => {
  const { id } = req.params;
  const role = await Role.findById(id).lean();
  if(!role || role.school.toString() !== req.user.school.toString()) {
    req.flash("error", "You can not access that route");
    res.redirect("/roles");
  } else {
    res.render("users/role-edit", {
      pageTitle: "Edit Role",
      roleLink: true,
      role: role,
    });
  }
};

controllers.edit = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const role = await Role.findById(id);
  const roleInUse = await Role.findOne({
    school: req.user.school,
    name: name.toLowerCase(),
    _id: { $ne: id },
  });
  if (name.length < 1) {
    req.flash("error", "The name field was blank. Submit a name and try again");
    res.redirect("/role/edit/" + id);
  } else if (!role || role.school.toString() !== req.user.school.toString()) {
    req.flash("error", "You can not access that route");
    res.redirect("/roles");
  } else if (roleInUse || presetRoleInUse(name)) {
    req.flash("error", `${name} is already in use. Please try a different name`);
    res.redirect("/role/edit/" + id);
  } else {
    role.name = name;
    role.description = description;
    role.save();
    res.redirect("/roles");
  }
};

controllers.remove = async (req, res) => {
  const { id } = req.params;
  const role = await Role.findById(id);
  const countUsersWithRole = await User.countDocuments({
    role: {$in: role.name},
  });
  if(!role || role.school.toString() !== req.user.school.toString()) {
    req.flash("error", "You can not access that route");
    res.redirect("/roles");
  } else if (countUsersWithRole > 0) {
    req.flash("error", "Imposible to remove because there are users associated");
    res. redirect("/roles");
  } else {
    role.remove();
    res.redirect("/roles");
  }
};

module.exports = controllers;

const controllers = {};

controllers.home = (req, res) => {
  res.render("open/index", {});
};

controllers.services = (req, res) => {
  res.render("open/services",{});
};

module.exports = controllers;

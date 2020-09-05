const controllers = {};

controllers.home = (req, res) => {
  res.render("open/index", {});
};

module.exports = controllers;

const controllers = {};

controllers.home = (req, res) => {
  res.render("front/index", {
    layout: "front",
    pageTitle: "Home",
  });
};

controllers.services = (req, res) => {
  res.render("front/services", {
    layout: "front",
    pageTitle: "Services",
  });
};

module.exports = controllers;

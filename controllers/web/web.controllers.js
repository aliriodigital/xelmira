const controllers = {};

controllers.home = (req, res) => {
  res.render("pages/web/home", {
    layout: "web"
  });
};

module.exports = controllers;

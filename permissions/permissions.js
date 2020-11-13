const permissions = {};
const { isAdmin } = require("../helpers/auth");

permissions.isAdmin = (req, res, next) => {
    if(isAdmin(req.user.role)) {
      next();
    } else {
      req.flash("error", "You are not admin. Please try another route");
      res.redirect("/courses");
    }
  }

  module.exports = permissions;
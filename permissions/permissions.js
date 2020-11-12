const permissions = {};

permissions.isAdmin = (req, res, next) => {
    if(req.user.role === "admin") {
      next();
    } else {
      req.flash("error", "You are not admin. Please try another route");
      res.redirect("/courses");
    }
  }

  module.exports = permissions;
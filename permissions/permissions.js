const School = require("../models/School");
const { isAdmin } = require("../helpers/auth");
const User = require("../models/User");
const permissions = {};

permissions.isAdmin = (req, res, next) => {
	if (isAdmin(req.user.role)) {
		next();
	} else {
		req.flash("error", "You can not view this page because you are not admin. Please try another page");
		res.redirect("/user/profile");
	}
}

module.exports = permissions;
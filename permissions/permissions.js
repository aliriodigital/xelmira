const School = require("../models/School");
const { isAdmin } = require("../helpers/auth");
const User = require("../models/User");

const permissions = {};

permissions.canEditUser = (req, res, user) => {
	if(req.user.school != user.school){
		req.flash("error", "You can not access that route. Please try another one");
    	res.redirect("/users");
	}
}


permissions.canEditCourse = async (req, res, course) => {
	if(!course.creatorUser) return;
	console.log(course.creatorUser);
	const user = await User.findById(course.creatorUser);
	if(req.user.school != user.school){
		req.flash("error", "Sorry, you are not authorized to view this content");
    	res.redirect("/courses");
	}
}


permissions.isAdmin = (req, res, next) => {
	if (isAdmin(req.user.role)) {
		next();
	} else {
		req.flash("error", "You are not admin. Please try another route");
		res.redirect("/courses");
	}
}

module.exports = permissions;
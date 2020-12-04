const School = require("../models/School");
const { isAdmin } = require("../helpers/auth");
const User = require("../models/User");
const Course = require("../models/Course");

const permissions = {};

permissions.isAdmin = (req, res, next) => {
	if(isAdmin(req.user.role)) {
		next();
	} else {
		req.flash("error", "You do not have access to that route. Please try another route");
		res.redirect("/users");
	}
}


permissions.isInSchool = async (req, res, next) => {
	console.log(req.params.id);
	var id = req.params.id;
	const course = await Course.findById(id).lean();
	const user = await User.findById(course.creatorUser);
	if(!user || req.user.school != user.school){
		req.flash("error", "Sorry, you are not authorized to view this content ..");
    	res.redirect("/courses");
	}else{
		next();
	}
}





module.exports = permissions;
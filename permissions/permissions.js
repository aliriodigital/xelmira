const permissions = {};
const { isSchool, isAdmin } = require("../helpers/auth");

// permissions.isSchool = (req, res, next) => {
//   if(isSchool(req.user.school)) {
//     next();
//   } else {
//     req.flash("error", "Sorry, you are not authorized to view this content");
//     res.redirect("/courses");
//   }
// }


permissions.canEditUser = (req, res, user) => {
	if(req.user.school != user.school){
		req.flash("error", "Sorry, you are not authorized to view this content");
    	res.redirect("/users");
	}
}

permissions.isAdmin = (req, res, next) => {
	if(isAdmin(req.user.role)) {
	  next();
	} else {
	  req.flash("error", "You are not admin. Please try another route");
	  res.redirect("/courses");
	}
}

  module.exports = permissions;
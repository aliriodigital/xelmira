const School = require("../models/School");
const { isAdmin } = require("../helpers/auth");
const User = require("../models/User");
const mongoose = require("mongoose");

const permissions = {};


permissions.isAdmin = (req, res, next) => {
	if (isAdmin(req.user.role)) {
		next();
	} else {
		req.flash("error", "You are not admin. Please try another route");
		res.redirect("/courses");
	}
}

var getItemObject = async (resource, id) => {
	var item = null;
	if(resource == 'course'){
		item = await Course.findById(id).lean();
	}

	return item;
};


permissions.isInSchoolV2 = (resource) => {
  return function (req, res, next) {
    if (role !== req.user.school){
    	req.flash("error", "Sorry, you are not authorized to view this content");
    	res.redirect('/'+resource);
    } 
    else next();
  }
}


permissions.isInSchool = function (resource, modelname){

	return async (req, res, next) => {
		var resourceMap = {
			'user': 'users',
			'course': 'courses',
		};

		var id = req.params.id;
		var user = null;
		if(!id){
			next();
			return;
		}

	    var model = require("../models/"+modelname);

		var item = await model.findById(id).lean();
		if(!item || req.user.school != item.school){
			req.flash("error", "Sorry, you are not authorized to view this content");
			res.redirect('/'+resource);
		}else{
			next();
		}
	}

} 





module.exports = permissions;
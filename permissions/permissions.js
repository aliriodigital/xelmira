const School = require("../models/School");
const { isAdmin } = require("../helpers/auth");
const User = require("../models/User");
const Course = require("../models/Course");

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


permissions.isInSchool = async (req, res, next) => {
	var resourceMap = {
		'user': 'users',
		'course': 'courses',
	};


	var path = req.path;

	var check = path.split('\/');
	var resource = check[1];
	var id = req.params.id;
	console.log('id', id);
	var user = null;
	if(!id){
		next();
		return;
	}
	if(resource == 'user'){
		 user = await User.findById(id).lean();
	}else{

		var item = await getItemObject(resource, id);

		if(item)
			user = await User.findById(item.creatorUser).lean();
	}
	
	if(!user || req.user.school != user.school){
		req.flash("error", "Sorry, you are not authorized to view this content");
		if(resourceMap[resource])
    		res.redirect('/'+resourceMap[resource]);
    	else
    		res.redirect('/');
	}else{
		next();
	}
}





module.exports = permissions;
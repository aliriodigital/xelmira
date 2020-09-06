
const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You are not authorized. Please signup below!")
    res.redirect("/signin");
}

module.exports = helpers;
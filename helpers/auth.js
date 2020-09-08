
const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You are not authorized. You need to signup!")
    res.redirect("/signin");
}

module.exports = helpers;
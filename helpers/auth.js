const helpers = {};
const axios = require("axios");
require("dotenv").config();
const { gSiteKey, gSecretKey } = process.env;

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Authorization required. You need to signup!");
  res.redirect("/signin");
};

helpers.verifyRecaptcha = async (req, res, next) => {
  const verificationURL =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    gSecretKey +
    "&response=" +
    req.body["g-recaptcha-response"] +
    "&remoteip=" +
    req.connection.remoteAddress;

  const response = await axios.get(verificationURL);
  if (response.data.success !== undefined && !response.data.success) {
    req.flash("error", "Sorry! Failed captcha verification!");
    res.redirect("/signin");
  }
  return next();
};


helpers.isAdmin = (role) => {
  return ["admin"].indexOf(role) !== -1 ? true : false
};

helpers.isPES = (role) => { 
  return ["parent", "employee", "student"].indexOf(role) !== -1 ? true : false;
}


module.exports = helpers;

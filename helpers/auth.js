const helpers = {};
const axios = require("axios");
const { gSiteKey, gSecretKey } = process.env;

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Sorry! You are not authorized. You need to signup!");
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

module.exports = helpers;

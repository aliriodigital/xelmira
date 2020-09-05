const express = require("express");
const path = require("path");
const expressHandlebars = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");

/* INITIALIZATIONS */
const app = express();
require("./config/database.js");
require("./config/passport-local");

/* SETTINGS */
const hbs = expressHandlebars.create({
  extname: "hbs",
  layoutsDir: path.join(__dirname, "./views/shared/layouts"),
  partialsDir: path.join(__dirname, "./views/shared/partials"),
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

/* MIDDLEWARES */
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "alemSecretKey",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.successMsg = req.flash("successMsg");
  res.locals.errorMsg = req.flash("errorMsg");
  next();
});
app.use(passport.initialize());
app.use(passport.session());

/* ROUTES */
app.use("/", require("./routes/open/signup.routes"));
app.use("/", require("./routes/open/signin.routes"));
app.use("/", require("./routes/open/others.routes"));

module.exports = app;

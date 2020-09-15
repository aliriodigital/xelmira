const express = require("express");
const path = require("path");
const expressHandlebars = require("express-handlebars");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

/* INITIALIZATIONS */
const app = express();
require("./config/database.js");
require("./config/passport-local");

/* SETTINGS */
const hbs = expressHandlebars.create({
  extname: "hbs",
  layoutsDir: path.join(__dirname, "./views/shared/layouts"),
  partialsDir: path.join(__dirname, "./views/shared/partials"),
  defaultLayout: "admin",
  helpers: {
    json: (context) => {
      return JSON.stringify(context);
    },
    block: function (name) {
      let blocks = this._blocks;
      let content = blocks && blocks[name];
      return content ? content.join("\n") : null;
    },
    contentFor: function (name, options) {
      let blocks = this._blocks || (this._blocks = {});
      let block = blocks[name] || (blocks[name] = []);
      block.push(options.fn(this));
    },
  },
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
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/* GLOBAL VARIABLES */
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

/* ROUTES */
app.use("/", require("./routes/front/signup.routes"));
app.use("/", require("./routes/front/signin.routes"));
app.use("/", require("./routes/front/others.routes"));
app.use("/", require("./routes/programmes/courses.routes"));

module.exports = app;

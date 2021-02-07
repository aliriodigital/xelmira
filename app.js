const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const passport = require("passport");
const { initialRoles } = require("./config/initialSetup");

/* INITIALIZATIONS */
const app = express();
require("./config/database.js");
require("./config/passport-local");
initialRoles();


/* SETTINGS */
const { hbs } = require("./config/handlebars");
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

/* MIDDLEWARES */
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "alemSecretKey",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: "sessions",
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // One day
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/* GLOBAL VARIABLES */
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.parent = req.flash("parent");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});


/* ROUTES */
app.use("/", require("./routes/front/signup.routes"));
app.use("/", require("./routes/front/signin.routes"));
app.use("/", require("./routes/front/others.routes"));
app.use("/", require("./routes/users/user.routes"));
app.use("/", require("./routes/users/role.routes"));
app.use("/", require("./routes/users/profile.routes"));
app.use("/", require("./routes/programmes/course.routes"));
app.use("/", require("./routes/programmes/batch.routes"));
app.use("/", require("./routes/programmes/batch.presets.routes"));
app.use("/", require("./routes/programmes/subject.routes"));
app.use("/", require("./routes/programmes/subject.preset.routes"));
app.use("/", require("./routes/students/student.routes"));
app.use("/", require("./routes/parents/parent.routes"));

module.exports = app;

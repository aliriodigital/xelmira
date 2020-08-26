const express = require("express");
const path = require("path");
const app = express();

const session = require("express-session");
const flash = require("connect-flash");
app.use(
  session({
    secret: "secretText",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use((req, res, next) => {
    app.locals.successMsg = req.flash('successMsg');
    next();
})

const expressHandlebars = require("express-handlebars");
const hbs = expressHandlebars.create({
  extname: "hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/web/authen.routes"));
app.use("/", require("./routes/web/web.routes"));

module.exports = app;

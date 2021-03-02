const expressHandlebars = require("express-handlebars");
const { MongooseDocument } = require("mongoose");
const path = require("path");
const moment = require("moment");

const hbs = expressHandlebars.create({
  extname: "hbs",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  layoutsDir: path.join(__dirname, "../views/shared/layouts"),
  partialsDir: path.join(__dirname, "../views/shared/partials"),
  defaultLayout: "admin",
  helpers: {
    json: (context) => {
      return JSON.stringify(context);
    },

    check: (value) => {
      return value === "true" ? "checked" : "";
    },

    check2: (value) => {
      return value === true ? "checked" : "";
    },

    selected: (property1, property2) => {
      let compare = property1 === property2 ? "selected" : "";
      return compare;
    },

    field: (obj, fieldname) => {
      return obj && typeof obj[fieldname] !== "undefined" ? obj[fieldname] : "";
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

    formatDate: function (date, format) {
      return moment(date).format(format);
    },

    ageInYears: function (birthdate) {
      return moment().diff(birthdate, "years");
    },

    firstLetter: function (string) {
      return string.charAt(0);
    },
    numberedSort: function (value) {
      return parseInt(value) + 1;
    },
  },
});

module.exports = { hbs };

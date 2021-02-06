
const expressHandlebars = require("express-handlebars");
const { MongooseDocument } = require("mongoose");
const path = require("path");
const moment = require("moment");

const hbs = expressHandlebars.create({
  extname: "hbs",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  },
  layoutsDir: path.join(__dirname, "../views/shared/layouts"),
  partialsDir: path.join(__dirname, "../views/shared/partials"),
  defaultLayout: "admin",
  helpers: {
    json: (context) => {
      return JSON.stringify(context);
    },

    check: (property1, property2) => {
      let validate = property1 === property2 ? "checked" : "";
      return validate;
    },

    selected: (property1, property2) => {
      let compare = property1 === property2 ? "selected" : "";
      return compare;
    },

    field: (obj, fieldname) => {
      //Serves properties of global objects
      return obj && typeof obj[fieldname] !== 'undefined' ? obj[fieldname] : '';
    },

    block: function (name) { //Run grabbed code. See contentFor helper.
      let blocks = this._blocks;
      let content = blocks && blocks[name];
      return content ? content.join("\n") : null;
    },

    contentFor: function (name, options) { //Grab below code on hbs page
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
    }
  },
});

module.exports = { hbs };

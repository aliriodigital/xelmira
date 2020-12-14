
const expressHandlebars = require("express-handlebars");
const { MongooseDocument } = require("mongoose");
const path = require("path");

const hbs = expressHandlebars.create({
  extname: "hbs",
  layoutsDir: path.join(__dirname, "../views/shared/layouts"),
  partialsDir: path.join(__dirname, "../views/shared/partials"),
  defaultLayout: "admin",
  helpers: {
    json: (context) => {
      return JSON.stringify(context);
    },
    field: (obj, fieldname) => {
      //Serves properties of global objects
      return obj &&  typeof obj[fieldname] !== 'undefined' ? obj[fieldname] : '';
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
    formatDate: function(date, format) {
      return moment(date).format(format);
    }
  },
});

module.exports = { hbs };


const expressHandlebars = require("express-handlebars");
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
      return obj[fieldname];
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

module.exports = { hbs };

const exphbs = require('express-handlebars');
const path = require('path');
const moment = require('moment');

const hbs = exphbs.create({
    extname: 'hbs',
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, '../views/partials'),
    layoutsDir: path.join(__dirname, '../views/layouts'),
    helpers: { 
        counter: (index) => {
            return index + 1;
        },
        json: (context) => {
            return JSON.stringify(context);
        },
        formatDate: function(date, format) {
            return moment(date).format(format);
        }
    }
});

module.exports = {
    exphbs,
    hbs
}
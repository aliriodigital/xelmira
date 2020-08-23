const express = require('express');
const path = require('path');
const app = express();

const session = require('express-session');
const flash = require('connect-flash');
app.use(session({
    secret: 'secretText',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use((req, res, next) => {
    app.locals.successMsg = req.flash('successMsg');
    next();
});

const { hbs } = require('../../config/hbs.config');
app.use('/web', express.static(path.join(__dirname, './assets')));

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

const signupRoutes = require('./routes/web.routes');
app.use('/', signupRoutes);

module.exports = app;
const express = require('express');
const path = require('path');
const app = express();

const { hbs } = require('../../config/hbs.config');
app.use('/users', express.static(path.join(__dirname, './assets')));

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

const userRoutes = require('./routes/user.route');
app.use('/', userRoutes);

module.exports = app;
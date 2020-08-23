const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const { hbs } = require('./config/hbs.config');

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

const web = require('./features/web/app');
app.use('/', web);

const programmes = require('./features/programmes/app');
app.use('/', programmes);

const users = require('./features/users/app');
app.use('/', users);

app.get('/', (req, res) => {
    res.render('home', {frontHomeMenu: true });
});

require('./database');


app.listen(PORT, () => {
    console.log(`Running schoolProject server on localhost: ${PORT}`);
});


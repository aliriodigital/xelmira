const User = require("../../models/User");
const controllers = {};

controllers.read((req, res) => {
    res.send("User View");
});

module.exports = controllers;

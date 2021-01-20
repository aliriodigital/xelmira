const moment = require("moment");
const { isPES } = require("../../helpers/auth");
const controllers = {};

controllers.read = (req, res) => {
    let pesRole = isPES(req.user.role);
    const firstLetter = req.user.role[0].toUpperCase();
    res.render("users/profile", {
        name: req.user.name,
        role: firstLetter + req.user.role.slice(1),
        email: req.user.email,
        createdAt: moment(req.user.createdAt).format("MMMM Do YYYY"),
        menuLinkDisplay: pesRole,
    })
}

module.exports = controllers;
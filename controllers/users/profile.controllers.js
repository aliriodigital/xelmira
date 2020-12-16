const moment = require("moment");
const { isPES } = require("../../helpers/auth");
const controllers = {};

controllers.read = (req, res) => {
    let pesRole = isPES(req.user.role)? true : false;

    res.render("users/profile", {
        name: req.user.name,
        role: req.user.role,
        email: req.user.email,
        createdAt: moment(req.user.createdAt).format("MMMM Do YYYY"),
        menuLinkDisplay: pesRole,
    })
}

module.exports = controllers;
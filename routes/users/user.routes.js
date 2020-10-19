const express = require("express");
const router = express.Router();
const { read } = require("../../controllers/users/user.controllers");

router.get("/users", read);

module.exports = router;

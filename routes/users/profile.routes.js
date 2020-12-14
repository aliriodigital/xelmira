const express = require("express");
const router = express.Router();

const { read } = require("../../controllers/users/profile.controllers");

router.get("/user/profile", read);

module.exports = router;

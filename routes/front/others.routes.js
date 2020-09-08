const express = require("express");
const router = express.Router();

const { home, services } = require("../../controllers/front/others.controllers");
const { isAuthenticated } = require("../../helpers/auth");

router.get("/", home);
router.get("/services", isAuthenticated, services);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  signinForm,
  signin,
} = require("../../controllers/open/signin.controllers");

router.get("/signin", signinForm);
router.post("/signin", signin);

module.exports = router;

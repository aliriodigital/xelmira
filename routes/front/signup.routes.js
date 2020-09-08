const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  signupForm,
  signup,
} = require("../../controllers/front/signup.controllers");

router.get("/signup", signupForm);
router.post("/signup", signup);

module.exports = router;

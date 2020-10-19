const express = require("express");
const router = express.Router();
const passport = require("passport");
// const { verifyRecaptcha } = require("../../helpers/auth");

const {
  signupForm,
  signup,
} = require("../../controllers/front/signup.controllers");

router.get("/signup", signupForm);
// router.post("/signup", verifyRecaptcha, signup);

module.exports = router;

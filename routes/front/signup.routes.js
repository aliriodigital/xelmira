const express = require("express");
const router = express.Router();
const passport = require("passport");
// const { verifyRecaptcha } = require("../../helpers/auth");

const {
  signupForm,
  signup,
} = require("../../controllers/front/signup.controllers");

router.get("/signup", signupForm);
<<<<<<< HEAD
// router.post("/signup", verifyRecaptcha, signup);
=======
router.post("/signup", /* verifyRecaptcha, */ signup);
>>>>>>> tmp

module.exports = router;

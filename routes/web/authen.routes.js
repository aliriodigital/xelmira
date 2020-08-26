const express = require("express");
const router = express.Router();

const {
  signupForm,
  signup,
  signinForm
} = require("../../controllers/web/authen.controllers");

router.get("/signup", signupForm);
router.post("/signup", signup);
router.get("/signin", signinForm);

module.exports = router;

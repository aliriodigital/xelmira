const express = require("express");
const router = express.Router();
const path = require("path");

const {
  home,
  signupForm,
  signup,
  signinForm,
  signin,
  logout,
  faqs
} = require("../controllers/web.controller");

router.get("/", home);

router.get("/signup", signupForm);
router.post("/signup", signup);

router.get("/signin", signinForm);
router.post("/signin", signin);

router.get("/logout", logout);
router.get("/faqs", faqs);

module.exports = router;

const express = require("express");
const router = express.Router();
const { verifyRecaptcha } = require("../../helpers/auth");

const {
  signinForm,
  signin,
  logout,
} = require("../../controllers/front/signin.controllers");

router.get("/signin", signinForm);

router.post("/signin", verifyRecaptcha, signin);

router.get("/logout", logout);

module.exports = router;

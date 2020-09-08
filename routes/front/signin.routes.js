const express = require("express");
const router = express.Router();

const {
  signinForm,
  signin,
  logout,
} = require("../../controllers/front/signin.controllers");

router.get("/signin", signinForm);

router.post("/signin", signin);

router.get("/logout", logout);

module.exports = router;

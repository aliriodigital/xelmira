const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../helpers/auth");

const {
  read,
  createForm,
  create,
  updateForm,
  update,
  remove,
} = require("../../controllers/users/user.controllers");

router.get("/users", isAuthenticated, read);
router.get("/user/new", isAuthenticated, createForm);
router.post("/user/new", isAuthenticated, create);
router.get("/user/edit/:id", isAuthenticated, updateForm);
router.post("/user/edit/:id", isAuthenticated, update);
router.get("/user/remove/:id", isAuthenticated, remove);

module.exports = router;

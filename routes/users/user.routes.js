const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../helpers/auth");
const { isInSchool, isAdmin } = require("../../permissions/permissions");

const {
  read,
  createForm,
  create,
  updateForm,
  update,
  remove,
} = require("../../controllers/users/user.controllers");

router.get("/users", isAuthenticated, isAdmin, read);
router.get("/user/new", isAuthenticated, isAdmin, createForm);
router.post("/user/new", isAuthenticated, isAdmin, create);
router.get("/user/edit/:id", isAuthenticated, isInSchool, isAdmin, updateForm);
router.post("/user/edit/:id", isAuthenticated, isInSchool, isAdmin, update);
router.get("/user/remove/:id", isAuthenticated, isInSchool, isAdmin, remove);

module.exports = router;

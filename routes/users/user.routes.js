const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../helpers/auth");
const { isAdmin } = require("../../permissions/permissions");

const {
  read,
  createView,
  create,
  editView,
  edit,
  remove,
} = require("../../controllers/users/user.controllers");

router.get("/users", isAuthenticated, isAdmin, read);
router.get("/user/new", isAuthenticated, isAdmin, createView);
router.post("/user/new", isAuthenticated, isAdmin, create);
router.get("/user/edit/:id", isAuthenticated, isAdmin, editView);
router.post("/user/edit/:id", isAuthenticated, isAdmin, edit);
router.get("/user/remove/:id", isAuthenticated, isAdmin, remove);

module.exports = router;

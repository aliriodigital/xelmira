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
} = require("../../controllers/users/role.controllers");

router.get("/roles", isAuthenticated, isAdmin, read);
router.get("/role/new", isAuthenticated, isAdmin, createView);
router.post("/role/new", isAuthenticated, isAdmin, create);
router.get("/role/edit/:id", isAuthenticated,isAdmin, editView);
router.post("/role/edit/:id", isAuthenticated, isAdmin, edit);
router.get("/role/remove/:id", isAuthenticated, isAdmin, remove);

module.exports = router;

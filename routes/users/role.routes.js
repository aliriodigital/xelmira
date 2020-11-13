const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../helpers/auth");

const { isAdmin } = require("../../permissions/permissions");


const {
  read,
  createForm,
  create,
  updateForm,
  update,
  remove,
} = require("../../controllers/users/role.controllers");

router.get("/roles", isAuthenticated, isAdmin, read);
router.get("/role/new", isAuthenticated, isAdmin, createForm);
router.post("/role/new", isAuthenticated, isAdmin, create);
router.get("/role/edit/:id", isAuthenticated,isAdmin, updateForm);
router.post("/role/edit/:id", isAuthenticated, isAdmin, update);
router.get("/role/remove/:id", isAuthenticated, isAdmin, remove);

module.exports = router;

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
} = require("../../controllers/users/role.controllers");

router.get("/roles", isAuthenticated, read);
router.get("/role/new", isAuthenticated, createForm);
router.post("/role/new", isAuthenticated, create);
router.get("/role/edit/:id", isAuthenticated, updateForm);
router.post("/role/edit/:id", isAuthenticated, update);
router.get("/role/remove/:id", isAuthenticated, remove);

module.exports = router;

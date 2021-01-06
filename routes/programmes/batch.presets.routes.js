const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../helpers/auth");
const { isAdmin } = require("../../permissions/permissions");

const {
  read,
  createForm,
  create,
  editForm,
  edit,
  remove,
} = require("../../controllers/programmes/batch.presets.controllers");

router.get("/batch/presets/", isAuthenticated, isAdmin, read);
router.get("/batch/preset/new/form", isAuthenticated, isAdmin, createForm);
router.post("/batch/preset/new", isAuthenticated, isAdmin, create);
router.get("/batch/preset/edit/form/:id", isAuthenticated, isAdmin, editForm);
router.post("/batch/preset/edit/:id", isAuthenticated, isAdmin, edit);
router.get("/batch/preset/delete/:id", isAuthenticated, isAdmin, remove);

module.exports = router;

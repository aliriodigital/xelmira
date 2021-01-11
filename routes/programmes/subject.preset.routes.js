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
} = require("../../controllers/programmes/subject.preset.controllers");

router.get("/subject/presets/", isAuthenticated, isAdmin, read);
router.get("/subject/preset/new/", isAuthenticated, isAdmin, createView);
router.post("/subject/preset/new", isAuthenticated, isAdmin, create);
router.get("/subject/preset/edit/:subjectPresetId", isAuthenticated, isAdmin, editView);
router.post("/subject/preset/edit/:subjectPresetId", isAuthenticated, isAdmin, edit);
router.get("/subject/preset/delete/:subjectPresetId", isAuthenticated, isAdmin, remove);

module.exports = router;

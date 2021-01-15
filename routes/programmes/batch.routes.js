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
} = require("../../controllers/programmes/batch.controllers");

router.get("/batches/course/:courseId", isAuthenticated, isAdmin, read);
router.get("/batch/new/form/course/:courseId", isAuthenticated, isAdmin, createView);
router.post("/batch/new/form/course/:courseId", isAuthenticated, isAdmin, create);
router.get("/batch/edit/form/:id/course/:courseId", isAuthenticated, isAdmin, editView);
router.post("/batch/edit/:id/course/:courseId", isAuthenticated, isAdmin, edit);
router.get("/batch/delete/:id", isAuthenticated, isAdmin, remove);

module.exports = router;

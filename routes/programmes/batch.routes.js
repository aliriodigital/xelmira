const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../helpers/auth");
const { isAdmin } = require("../../permissions/permissions");

const {
  read,
  getImport,
  postImport,
  createForm,
  create,
  editForm,
  edit,
  remove,
} = require("../../controllers/programmes/batch.controllers");

router.get("/batches/course/:courseId", isAuthenticated, isAdmin, read);
router.get("/batch/import/course/:courseId", isAuthenticated, isAdmin, getImport);
router.post("/batch/import/course/:courseId", isAuthenticated, isAdmin, postImport);
router.get("/batch/new/form/course/:courseId", isAuthenticated, isAdmin, createForm);
router.post("/batch/new/course/:courseId", isAuthenticated, isAdmin, create);
router.get("/batch/edit/form/:id/course/:courseId", isAuthenticated, isAdmin, editForm);
router.post("/batch/edit/:id/course/:courseId", isAuthenticated, isAdmin, edit);
router.get("/batch/delete/:id", isAuthenticated, isAdmin, remove);

module.exports = router;

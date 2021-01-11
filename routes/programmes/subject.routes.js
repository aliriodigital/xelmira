const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../helpers/auth");
const { isAdmin } = require("../../permissions/permissions");

const {
  read,
  // ImportView,
  // Import,
  createView,
  create,
  editView,
  // edit,
  // remove,
} = require("../../controllers/programmes/subject.controllers");

router.get("/subjects/batch/:batchId/course/:courseId", isAuthenticated, isAdmin, read);
// router.get("/batch/import/course/:courseId", isAuthenticated, isAdmin, getImport);
// router.post("/batch/import/course/:courseId", isAuthenticated, isAdmin, postImport);
router.get("/subject/new/batch/:batchId/course/:courseId", isAuthenticated, isAdmin, createView);
router.post("/subject/new/batch/:batchId/course/:courseId", isAuthenticated, isAdmin, create);
// router.get("/batch/edit/form/:id/course/:courseId", isAuthenticated, isAdmin, editForm);
// router.post("/batch/edit/:id/course/:courseId", isAuthenticated, isAdmin, edit);
// router.get("/batch/delete/:id", isAuthenticated, isAdmin, remove);

module.exports = router;

const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../helpers/auth");
const { isAdmin } = require("../../permissions/permissions");

const {
  read,
  bringInView,
  bringIn,
  createView,
  create,
  editView,
  edit,
  remove,
} = require("../../controllers/programmes/subject.controllers");

router.get("/subjects/batch/:batchId/course/:courseId", isAuthenticated, isAdmin, read);
router.get("/subject/import/batch/:batchId/course/:courseId", isAuthenticated, isAdmin, bringInView);
router.post("/subject/import/batch/:batchId/course/:courseId", isAuthenticated, isAdmin, bringIn);
router.get("/subject/new/batch/:batchId/course/:courseId", isAuthenticated, isAdmin, createView);
router.post("/subject/new/batch/:batchId/course/:courseId", isAuthenticated, isAdmin, create);
router.get("/subject/:subjectId/edit/batch/:batchId/course/:courseId", isAuthenticated, isAdmin, editView);
router.post("/subject/:subjectId/edit/batch/:batchId/course/:courseId", isAuthenticated, isAdmin, edit);
router.get("/subject/delete/:subjectId/batch/:batchId/course/:courseId", isAuthenticated, isAdmin, remove);

module.exports = router;

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
  profile,
  parentCreateView,
  parentCreate,
  parentEditView,
  parentEdit,
  parentRemove,
} = require("../../controllers/students/student.controllers");

router.get("/students", isAuthenticated, isAdmin, read);
router.get("/student/new", isAuthenticated, isAdmin, createView);
router.post("/student/new", isAuthenticated, isAdmin, create);
router.get("/student/edit/:id", isAuthenticated, isAdmin, editView);
router.post("/student/edit/:id", isAuthenticated, isAdmin, edit);
router.get("/student/remove/:id", isAuthenticated, isAdmin, remove);
router.get("/student/profile/:id", isAuthenticated, isAdmin, profile);
router.get("/student/:id/parent/new", isAuthenticated, isAdmin, parentCreateView);
router.post("/student/:id/parent/new", isAuthenticated, isAdmin, parentCreate);
router.get("/student/:id/parent/:parentId/edit", isAuthenticated, isAdmin, parentEditView);
router.post("/student/:id/parent/:parentId/edit", isAuthenticated, isAdmin, parentEdit);
router.get("/student/:id/parent/:parentId/remove", isAuthenticated, isAdmin, parentRemove);

module.exports = router;

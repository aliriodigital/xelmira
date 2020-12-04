const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../helpers/auth");
const { isInSchool, isAdmin } = require("../../permissions/permissions");

const {
  read,
  createForm,
  create,
  editForm,
  edit,
  remove,
} = require("../../controllers/programmes/course.controllers");

router.get("/courses", isAuthenticated, isAdmin, read);
router.get("/course/new/form", isAuthenticated, isAdmin, createForm);
router.post("/course/new", isAuthenticated, isAdmin, create);
router.get("/course/edit/form/:id", isAuthenticated, isInSchool, isAdmin, editForm);
router.post("/course/edit/:id", isAuthenticated, isInSchool, isAdmin, edit);
router.get("/course/delete/:id", isAuthenticated, isInSchool, isAdmin, remove);

module.exports = router;

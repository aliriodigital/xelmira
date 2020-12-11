const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../helpers/auth");
const { isInSchool, isAdmin, isInSchoolV2 } = require("../../permissions/permissions");

const {
  read,
  createForm,
  create,
  editForm,
  edit,
  remove,
} = require("../../controllers/programmes/course.controllers");


var middlwareInschool = isInSchool('courses', 'Course'); // define router only once

router.get("/courses", isAuthenticated, isAdmin, read);
router.get("/course/new/form", isAuthenticated, isAdmin, createForm);
router.post("/course/new", isAuthenticated, isAdmin, create);
router.get("/course/edit/form/:id", isAuthenticated, middlwareInschool, isAdmin, editForm);
router.post("/course/edit/:id", isAuthenticated, middlwareInschool, isAdmin, edit);
router.get("/course/delete/:id", isAuthenticated, middlwareInschool, isAdmin, remove);

module.exports = router;

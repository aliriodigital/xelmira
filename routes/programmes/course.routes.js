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
} = require("../../controllers/programmes/course.controllers");


router.get("/courses", isAuthenticated, isAdmin, read);
router.get("/course/new/form", isAuthenticated, isAdmin, createView);
router.post("/course/new", isAuthenticated, isAdmin, create);
router.get("/course/edit/form/:id", isAuthenticated, isAdmin, editView);
router.post("/course/edit/:id", isAuthenticated, isAdmin, edit);
router.get("/course/delete/:id", isAuthenticated, isAdmin, remove);

module.exports = router;

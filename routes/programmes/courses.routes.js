const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../helpers/auth");

const {
  read,
  createForm,
  create,
  editForm,
  edit,
  remove,
} = require("../../controllers/programmes/course.controllers");

router.get("/courses", isAuthenticated, read);
router.get("/course/new/form", isAuthenticated, createForm);
router.post("/course/new", isAuthenticated, create);
router.get("/course/edit/form/:id", isAuthenticated, editForm);
router.post("/course/edit/:id", isAuthenticated, edit);
router.get("/course/delete/:id", isAuthenticated, remove);

module.exports = router;

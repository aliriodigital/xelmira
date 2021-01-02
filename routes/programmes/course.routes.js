const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../helpers/auth");
const { isAdmin } = require("../../permissions/permissions");

const {
  read,
  createForm,
  create,
  // batches,
  editForm,
  edit,
  remove,
} = require("../../controllers/programmes/course.controllers");


router.get("/courses", isAuthenticated, isAdmin, read);
router.get("/course/new/form", isAuthenticated, isAdmin, createForm);
router.post("/course/new", isAuthenticated, isAdmin, create);
// router.get("/course/:id", batches);
router.get("/course/edit/form/:id", isAuthenticated, isAdmin, editForm);
router.post("/course/edit/:id", isAuthenticated, isAdmin, edit);
router.get("/course/delete/:id", isAuthenticated, isAdmin, remove);

module.exports = router;

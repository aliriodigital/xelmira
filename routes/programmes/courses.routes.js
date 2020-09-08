const express = require("express");
const router = express.Router();

const {
  read,
  createForm,
  create,
  editForm,
  edit,
  remove,
} = require("../../controllers/programmes/course.controllers");

router.get("/courses", read);

router.get("/course/new/form", createForm);
router.post("/course/new", create);

router.get("/course/edit/form/:id", editForm);
router.post("/course/edit/:id", edit);

router.get("/course/delete/:id", remove);

module.exports = router;

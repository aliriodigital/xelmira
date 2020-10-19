const express = require("express");
const router = express.Router();
const {
  read,
  createForm,
  create,
  updateForm,
  update,
  remove,
} = require("../../controllers/users/user.controllers");

router.get("/users", read);
router.get("/user/new", createForm);
router.post("/user/new", create);
router.get("/user/edit/:id", updateForm);
router.post("/user/edit/:id", update);
router.get("/user/remove/:id", remove);

module.exports = router;

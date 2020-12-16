const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../helpers/auth");
const { isAdmin } = require("../../permissions/permissions");

const {
  read,
  createForm,
  create,
  editForm,
  edit,
  remove,
} = require("../../controllers/programmes/batch.controllers");


router.get("/batches", isAuthenticated, isAdmin, read);
router.get("/batch/new/form", isAuthenticated, isAdmin, createForm);
router.post("/batch/new", isAuthenticated, isAdmin, create);
router.get("/batch/edit/form/:id", isAuthenticated, isAdmin, editForm);
router.post("/batch/edit/:id", isAuthenticated, isAdmin, edit);
router.get("/batch/delete/:id", isAuthenticated, isAdmin, remove);

module.exports = router;

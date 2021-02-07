const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../helpers/auth");
const { isAdmin } = require("../../permissions/permissions");

const {
  createView,
  create,
  // editView,
  // edit,
  // remove,
} = require("../../controllers/parents/parent.controllers");

router.get("/parent/new/:studentId", isAuthenticated, isAdmin, createView);
router.post("/parent/new/:studentId", isAuthenticated, isAdmin, create);
// router.get("/parent/edit/:id", isAuthenticated, isAdmin, editView);
// router.post("/parent/edit/:id", isAuthenticated, isAdmin, edit);
// router.get("/parent/remove/:id", isAuthenticated, isAdmin, remove);

module.exports = router;

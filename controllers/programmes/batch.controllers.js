const { session } = require("passport");
const Batch = require("../../models/Batch");
const Course = require("../../models/Course");
const controllers = {};

controllers.read = async (req, res) => {
  const batch = await Batch.find({ school: req.user.school }).lean();
  res.render("programmes/batches", {
    pageTitle: "Batches",
    featureTitle: "Manage Batches",
    batchLink: true,
    batch: batch,
  });
};

controllers.createForm = async (req, res) => {
  const course = await Course.find({ school: req.user.school }).lean();
  res.render("programmes/batch-new", {
    pageTitle: "Create Batch",
    featureTitle: "Create Batch",
    course: course,
  });
};

controllers.create = async (req, res) => {
  const { name, description, course } = req.body;
  const batchInUse = await Batch.findOne({ $and: [{school: req.user.school}, {name: name}]});
  const isCourse = await Course.findOne({ $and: [{school: req.user.school}, {name: course}]});
  if (name.length < 1) {
    error = "Please enter a name and try again";
    res.render("programmes/batch-new", {
      error: error,
    });
  } else if (batchInUse) {
    req.flash("error", `${name} is in use. Please enter another name`);
    res.redirect("/batch/new/form");
  } else if ( !isCourse ) {
    req.flash("error", `${course} is not valid. Please enter another course`);
    res.redirect("/batch/new/form");
  } else {
    const batch = new Batch(req.body);
    batch.course = isCourse.name;
    batch.creatorUser = req.user.id;
    batch.school = req.user.school;
    await batch.save();
    req.flash("success", "Batch created successfully");
    res.redirect("/batches");
  }
};

controllers.editForm = async (req, res) => {
  const { id } = req.params;
  const batch = await Batch.findById(id).lean();
  const course = await Course.find({school: req.user.school}).lean();
  if (req.user.school !== batch.school) {
    req.flash("error", "You can not edit this batch. Please try another one!");
    res.redirect("/batches");
  } else {
    res.render("programmes/batch-edit", {
      pageTitle: "Edit batch",
      featureTitle: "Edit batch",
      batch: batch,
      course: course,
    });
  }
};

controllers.edit = async (req, res) => {
  const { id } = req.params;
  const { name, description, course } = req.body;
  if (name.length < 1) {
    req.session.name = name;
    req.flash("error", "Please enter a name and try again");
    res.redirect("/batch/edit/form/" + id);
  } else {
    const batch = await Batch.findById(id);
    if (req.user.school !== batch.school) {
      req.flash("error", "You can not use this route. Try another one!");
      res.redirect("/batches");
    } else {
      batch.name = name;
      batch.description = description;
      batch.course = course;
      await batch.save();
      req.flash("success", "Batch updated successfully");
      res.redirect("/batches");
    }
  }
};

controllers.remove = async (req, res) => {
  const { id } = req.params;
  const batch = await Batch.findById(id);
  if (req.user.school !== batch.school) {
    req.flash("error", "You can not remove this batch. Please try another one!");
    res.redirect("/batches");
  } else {
    await batch.remove();
    req.flash("success", "Batch removed successfully");
    res.redirect("/batches");
  }

};

module.exports = controllers;

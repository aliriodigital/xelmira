const { session } = require("passport");
const Course = require("../../models/Course");
const Batch = require("../../models/Batch");
const Subject = require("../../models/Subject");
const controllers = {};

controllers.read = async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId).lean();
  const batch = await Batch.find({
    school: req.user.school,
    course: courseId,
  }).lean();
  res.render("programmes/batches", {
    pageTitle: "Batches",
    featureTitle: "Manage Batches",
    courseLink: true,
    batch: batch,
    course: course,
  });
};

controllers.createView = async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId).lean();
  res.render("programmes/batch-new", {
    pageTitle: "Create Batch",
    featureTitle: "Create Batch",
    courseLink: true,
    course: course,
  });
};

controllers.create = async (req, res) => {
  const { courseId } = req.params;
  const { name, description } = req.body;
  const batchInUse = await Batch.findOne({
    school: req.user.school,
    course: courseId,
    name: name,
  });
  const course = await Course.findById(courseId).lean();
  if (name.length < 1) {
    req.flash("error", "Please submit a batch name and try again");
    res.redirect("/batch/new/form/course/" + courseId);
  } else if (batchInUse) {
    const error = `${name} already exists. Please try a different name`;
    res.render("programmes/batch-new", {
      error: error,
      pageTitle: "Create Batch",
      featureTitle: "Create Batch",
      courseLink: true,
      name: name,
      description: description,
      course: course,
    });
  } else {
    const batch = new Batch(req.body);
    batch.course = course._id;
    batch.creatorUser = req.user.id;
    batch.school = req.user.school;
    await batch.save();
    req.flash("success", "Batch created successfully");
    res.redirect("/batches/course/" + courseId);
  }
};

controllers.editView = async (req, res) => {
  const { id, courseId } = req.params;
  const batch = await Batch.findById(id).lean();
  const course = await Course.findById({ _id: courseId }).lean();
  if (!batch || req.user.school !== batch.school) {
    req.flash("error", "You can not edit this batch. Please try another one!");
    res.redirect("/batches/course/" + courseId);
  } else {
    res.render("programmes/batch-edit", {
      pageTitle: "Edit batch",
      featureTitle: "Edit batch",
      courseLink: true,
      batch: batch,
      course: course,
    });
  }
};

controllers.edit = async (req, res) => {
  const { id, courseId } = req.params;
  const { name, description } = req.body;
  const batch = await Batch.findById(id);
  const batchInUse = await Batch.findOne({
    school: req.user.school,
    name: name,
    _id: { $ne: id },
  });
  if (name.length < 1) {
    req.flash("error", "Please enter a name and try again");
    res.redirect("/batch/edit/form/" + id + "/course/" + courseId);
  } else if (batchInUse) {
    req.flash("error", `${name} is already taken. Please try a different name`);
    res.redirect("/batch/edit/form/" + id + "/course/" + courseId);
  } else {
    if (!batch || req.user.school !== batch.school) {
      req.flash("error", "You can not use this route. Try another one!");
      res.redirect("/batches/course/" + courseId);
    } else {
      batch.name = name;
      batch.description = description;
      batch.course = courseId;
      await batch.save();
      req.flash("success", "Batch updated successfully");
      res.redirect("/batches/course/" + courseId);
    }
  }
};

controllers.remove = async (req, res) => {
  const { id } = req.params;
  const batch = await Batch.findById(id);
  const countSubjects = await Subject.countDocuments({ batch: id });
  if (!batch || req.user.school !== batch.school) {
    req.flash("error", "You can not remove this batch. Please try another one!");
    res.redirect("/batches");
  } else if (countSubjects > 0) {
    req.flash("error", "Impossible to remove because there are subjects associated");
    res.redirect("/batches/course/" + batch.course);
  } else {
    await batch.remove();
    req.flash("success", "Batch removed successfully");
    res.redirect("/batches/course/" + batch.course);
  }

};

module.exports = controllers;

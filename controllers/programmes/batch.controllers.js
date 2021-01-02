const { session } = require("passport");
const Batch = require("../../models/Batch");
const Course = require("../../models/Course");
const controllers = {};

controllers.read = async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId).lean();
  const batch = await Batch.find({ school: req.user.school }).lean();
  res.render("programmes/batches", {
    pageTitle: "Batches",
    featureTitle: "Manage Batches",
    courseLink: true,
    batch: batch,
    course: course,
  });
};

controllers.createForm = async (req, res) => {
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
  const batchInUse = await Batch.findOne({ $and: [{school: req.user.school}, {name: name}]});
  const course = await Course.findById(courseId);
  if (name.length < 1) {
    error = "Please enter a name and try again";
    res.render("programmes/batch-new", {
      error: error,
    });
  } else if (batchInUse) {
    req.flash("error", `${name} is in use. Please enter another name`);
    res.redirect("/batch/new/form/course" + id);
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

controllers.editForm = async (req, res) => {
  const { id, courseId } = req.params;
  const batch = await Batch.findById(id).lean();
  const course = await Course.findById({_id: courseId}).lean();
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
  if (name.length < 1) {
    req.session.name = name;
    req.flash("error", "Please enter a name and try again");
    res.redirect("/batch/edit/form/" + id + "/course/" + courseId);
  } else {
    const batch = await Batch.findById(id);
    if (!batch ||  req.user.school !== batch.school) {
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
  if (!batch ||  req.user.school !== batch.school) {
    req.flash("error", "You can not remove this batch. Please try another one!");
    res.redirect("/batches");
  } else {
    await batch.remove();
    req.flash("success", "Batch removed successfully");
    res.redirect("/batches/course/" + id);
  }

};

module.exports = controllers;

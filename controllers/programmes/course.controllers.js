const { session } = require("passport");
const Course = require("../../models/Course");
const Batch = require("../../models/Batch");
const Grade = require("../../models/Grade");
const controllers = {};

controllers.read = async (req, res) => {
  const course = await Course.find({ school: req.user.school }).lean();
  res.render("programmes/courses", {
    pageTitle: "Courses",
    featureTitle: "Manage Courses",
    courseLink: true,
    course: course,
  });
};

controllers.createView = async(req, res) => {
  const grades = await Grade.find().lean();
  res.render("programmes/course-new", {
    pageTitle: "Create course",
    featureTitle: "Create Course",
    courseLink: true,
    grades: grades,
  });
};

controllers.create = async (req, res) => {
  const { name, gradingSystem, description } = req.body;
  console.log(req.body);
  const courseInUse = await Course.findOne({
    school: req.user.school,
    name: name,
  });
  let error = "";
  if (name.length < 1) error = "Enter a name";
  if (courseInUse) error = `${name} already taken. Try a different name`;
  if (gradingSystem === "Select Grading System")
    error = "Select a grading system";
  if (error.length > 0) {
    res.render("programmes/course-new", {
      pageTitle: "Create course",
      featureTitle: "Create Course",
      courseLink: true,
      error: error,
      name: name,
      gradingSystem: gradingSystem,
      description: description,
    });
  } else {
    const course = new Course(req.body);
    course.creatorUser = req.user.id;
    course.school = req.user.school;
    await course.save();
    req.flash("success", "Course created successfully");
    res.redirect("/courses");
  }
};

controllers.editView = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id).lean();
  const grades = await Grade.find().lean();
  if (!course || course.school.toString() !== req.user.school.toString()) {
    req.flash("error", "You can not edit this course. Please try another one!");
    res.redirect("/courses");
  } else {
    res.render("programmes/course-edit", {
      pageTitle: "Edit course",
      featureTitle: "Edit Course",
      courseLink: true,
      course: course,
      grades: grades,
    });
  }
};

controllers.edit = async (req, res) => {
  const { id } = req.params;
  const { name, gradingSystem, description } = req.body;
  const course = await Course.findById(id);
  const courseInUse = await Course.findOne({
    school: req.user.school,
    name: name,
    _id: { $ne: id },
  });
  let error = "";
  if (!course || course.school.toString() !== req.user.school.toString()) {
    error = "You can not access that route";
  }
  if (name.length < 1) error = "Enter a name";
  if (courseInUse) error = `${name} already taken. Try a different name`;
  if (gradingSystem === "Select Grading System")
    error = "Select a grading system";
  if (error > 0) {
    req.flash("error", error);
    res.redirect("/courses");
  } else {
    course.name = name;
    course.gradingSystem = gradingSystem;
    course.description = description;
    await course.save();
    req.flash("success", "Course updated successfully");
    res.redirect("/courses");
  }
};

controllers.remove = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  const countBatches = await Batch.countDocuments({ course: id });
  if (!course || course.school.toString() !== req.user.school.toString()) {
    req.flash(
      "error",
      "You can not remove this course. Please try a different one!"
    );
    res.redirect("/courses");
  } else if (countBatches > 0) {
    req.flash(
      "error",
      `Impossible to remove because there are batches associated`
    );
    res.redirect("/courses");
  } else {
    await course.remove();
    req.flash("success", "Course removed successfully");
    res.redirect("/courses");
  }
};

module.exports = controllers;

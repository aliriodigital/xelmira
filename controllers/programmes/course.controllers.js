const Course = require("../../models/Course");
const spaces = require("../../utils/formatString");
const controllers = {};

controllers.read = async (req, res) => {
  const course = await Course.find({ user: req.user.id }).lean();
  res.render("programmes/courses", {
    pageTitle: "Courses",
    featureTitle: "Manage Courses",
    course: course,
    userName: req.user.name,
  });
};

controllers.createForm = (req, res) => {
  res.render("programmes/course-new", {
    pageTitle: "Create course",
    featureTitle: "Create Course",
  });
};

controllers.create = async (req, res) => {
  const { name, description } = req.body;
  const trimmedName = spaces.trim(name);
  const trimmedDescription = spaces.trim(description);

  if (trimmedName.length < 1) {
    errorMsg = "Please enter a name and try again";
    res.render("programmes/course-new", {
      error: errorMsg,
    });
  } else {
    const course = new Course(req.body);
    course.name = trimmedName;
    course.description = trimmedDescription;
    course.user = req.user.id;
    await course.save();
    req.flash("success", "Course created successfully");
    res.redirect("/courses");
  }
};

controllers.editForm = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id).lean();
  res.render("programmes/course-edit", {
    pageTitle: "Edit course",
    featureTitle: "Edit Course",
    course: course,
  });
};

controllers.edit = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const course = await Course.findById(id);
  const trimmedName = spaces.trim(name);
  const trimmedDescription = spaces.trim(description);

  if (trimmedName.length < 1) {
    req.flash(
      "error",
      `${course.name} was not changed because field was blank`
    );
    res.redirect("/courses");
  } else {
    course.name = trimmedName;
    course.description = trimmedDescription;
    await course.save();
    req.flash("success", "Course updated successfully");
    res.redirect("/courses");
  }
};

controllers.remove = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById({ _id: id });
  await course.remove();
  req.flash("success", "Course removed successfully");
  res.redirect("/courses");
};

module.exports = controllers;

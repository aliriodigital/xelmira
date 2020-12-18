const { session } = require("passport");
const Course = require("../../models/Course");
const controllers = {};

controllers.read = async (req, res) => {
  const course = await Course.find({school: req.user.school}).lean();
  res.render("programmes/courses", {
    pageTitle: "Courses",
    featureTitle: "Manage Courses",
    courseLink: true,
    course: course,
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
  if (name.length < 1) {
    errorMsg = "Please enter a name and try again";
    res.render("programmes/course-new", {
      error: errorMsg,
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

controllers.editForm = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id).lean();
  if (!course ||  req.user.school !== course.school) {
    req.flash("error", "You can not edit this course. Please try another one!");
    res.redirect("/courses");
  } else {
    res.render("programmes/course-edit", {
      pageTitle: "Edit course",
      featureTitle: "Edit Course",
      course: course,
    });
  }
};

controllers.edit = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  if (name.length < 1) {
    req.session.name = name;
    req.flash("error", "Please enter a name and try again");
    res.redirect("/course/edit/form/" + id);
  } else {
    const course = await Course.findById(id);
    if (!course ||  req.user.school !== course.school) {
      req.flash("error", "You can not use this route. Try another one!");
      res.redirect("/courses");
    } else {
      course.name = name;
      course.description = description;
      await course.save();
      req.flash("success", "Course updated successfully");
      res.redirect("/courses");
    }
  }
};

controllers.remove = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course || req.user.school !== course.school) {
    req.flash("error", "You can not remove this course. Please try another one!");
    res.redirect("/courses");
  } else {
    await course.remove();
    req.flash("success", "Course removed successfully");
    res.redirect("/courses");
  }

};

module.exports = controllers;

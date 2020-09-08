const Course = require("../../models/Course");
const controllers = {};

controllers.read = async (req, res) => {
  const course = await Course.find().lean();
  res.render("programmes/courses", {
    pageTitle: "Courses",
    featureTitle: "Manage Courses",
    course: course,
  });
};

controllers.createForm = (req, res) => {
  res.render("programmes/course-new", {
    featureTitle: "Create Course",
  });
};

controllers.create = async (req, res) => {
  const { name, description } = req.body;
  const course = new Course(req.body);
  await course.save();
  req.flash("success", "Course created successfully");
  res.redirect("/courses");
};

controllers.editForm = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id).lean();
  res.render("programmes/course-edit", {
    featureTitle: "Edit Course",
    course: course,
  });
};

controllers.edit = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  let course = await Course.findById({ _id: id });
  course.name = name;
  course.description = description;
  await course.save();
  req.flash("success", "Course updated successfully");
  res.redirect("/courses");
};

controllers.remove = async (req, res) => {
    const { id } = req.params;
    const course = await Course.findById({ _id: id});
    await course.remove();
    res.redirect("/courses");
}

module.exports = controllers;
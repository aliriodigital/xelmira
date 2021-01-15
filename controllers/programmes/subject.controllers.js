const { session } = require("passport");
const Subject = require("../../models/Subject");
const Batch = require("../../models/Batch");
const Course = require("../../models/Course");
const controllers = {};

controllers.read = async (req, res) => {
  const { batchId, courseId } = req.params;
  const course = await Course.findById(courseId).lean();
  const batch = await Batch.findById(batchId).lean();
  const subject = await Subject.find({
    $and:
      [
        { school: req.user.school },
        { course: courseId },
        { batch: batchId }
      ]
  }).lean();
  res.render("programmes/subjects", {
    pageTitle: "Subjects",
    featureTitle: "Manage Subjects",
    courseLink: true,
    course: course,
    batch: batch,
    subject: subject,
  });
};

controllers.bringInView = async (req, res) => {
  const { batchId, courseId } = req.params;
  const subject = await Subject.find({ preset: true }).lean();
  const batch = await Batch.findById(batchId).lean();
  const course = await Course.findById(courseId).lean();
  res.render("programmes/subject-import", {
    pageTitle: "Import Subjects",
    featureTitle: "Import Subjects",
    courseLink: true,
    subject: subject,
    batch: batch,
    course: course,
  });
}

controllers.bringIn = async (req, res) => {
  const { batchId, courseId } = req.params;
  const data = req.body;
  const arr = Object.keys(data).map(k => data[k]);
  const buildSaveBatches = async () => {
    const arrLength = arr.length;
    let i;
    for (i = 0; i < arrLength; i++) {
      const preset = await Subject.find({ _id: arr[i] });
      const presetInUse = await Subject.findOne({
        $and:
          [
            { school: req.user.school },
            { batch: batchId },
            { name: preset[0].name }
          ]
      });
      if (presetInUse) {
        req.flash("error", "No name duplicates are allowed. Please discard duplicates");
        res.redirect("/subject/import/batch/" + batchId + "/course/" + courseId);
        break;
      } else {
        const newPreset = new Subject();
        newPreset.batch = batchId;
        newPreset.course = courseId;
        newPreset.preset = false;
        newPreset.school = req.user.school;
        newPreset.creatorUser = req.user.id;
        newPreset.description = preset[0].description;
        newPreset.name = preset[0].name;
        newPreset.save();
      }
    }
    req.flash("success", "Subjects imported successfully");
    res.redirect("/subjects/batch/" + batchId + "/course/" + courseId);
  }
  buildSaveBatches();
}


controllers.createView = async (req, res) => {
  const { batchId, courseId } = req.params;
  const course = await Course.findById(courseId).lean();
  const batch = await Batch.findById(batchId).lean();
  res.render("programmes/subject-new", {
    pageTitle: "Create Subject",
    featureTitle: "Create Subject",
    courseLink: true,
    action: `/subject/new/batch/${batchId}/course/${courseId}`,
    course: course,
    batch: batch,
  });
};

controllers.create = async (req, res) => {
  const { batchId, courseId } = req.params;
  const { name, description } = req.body;
  const subjectInUse = await Subject.findOne({
    $and: [
      { school: req.user.school },
      { batch: batchId },
      { name: name }
    ]
  });
  const course = await Course.findById(courseId).lean();
  const batch = await Batch.findById(batchId).lean();
  if (name.length < 1) {
    req.flash("error", "Please submit a subject name and try again");
    res.redirect("/subject/new/batch/" + batchId + "/course/" + courseId);
  } else if (subjectInUse) {
    const error = `${name} already exists. Please try a different name`;
    res.render("programmes/subject-new", {
      error: error,
      pageTitle: "Create Subject",
      featureTitle: "Create Subject",
      courseLink: true,
      name: name,
      description: description,
      course: course,
      batch: batch,
    });
  } else {
    const subject = new Subject(req.body);
    subject.batch = batchId;
    subject.course = courseId;
    subject.creatorUser = req.user.id;
    subject.school = req.user.school;
    await subject.save();
    req.flash("success", "Subject created successfully");
    res.redirect("/subjects/batch/" + batchId + "/course/" + courseId);
  }
};

controllers.editView = async (req, res) => {
  const { subjectId, batchId, courseId } = req.params;
  const subject = await Subject.findById(subjectId).lean();
  const batch = await Batch.findById(batchId).lean();
  const course = await Course.findById(courseId).lean();
  if (!subject || req.user.school !== subject.school) {
    req.flash("error", "You can not edit this subject. Please try another one!");
    res.redirect("/subjects/batch/" + batchId + "/course/" + courseId);
  } else {
    res.render("programmes/subject-new", {
      pageTitle: "Edit Subject",
      featureTitle: "Edit Subject",
      courseLink: true,
      action: `/subject/${subjectId}/edit/batch/${batchId}/course/${courseId}`,
      subject: subject,
      batch: batch,
      course: course,
    });
  }
};

controllers.edit = async (req, res) => {
  const { subjectId, batchId, courseId } = req.params;
  const { name, description } = req.body;
  const subject = await Subject.findById(subjectId);
  const subjectInUse = await Subject.findOne({
    $and:
      [
        { school: req.user.school },
        { batch: batchId },
        { name: name },
        { _id: { $ne: subjectId } }
      ]
  })
  if (name.length < 1) {
    req.flash("error", "Please enter a name and try again");
    res.redirect("/subject/" + subjectId + "/edit/batch/" + batchId + "/course/" + courseId);
  } else if (subjectInUse) {
    req.flash("error", `${name} is already taken. Try a different name`);
    res.redirect("/subject/" + subjectId + "/edit/batch/" + batchId + "/course/" + courseId);
  } else {
    if (!subject || req.user.school !== subject.school) {
      req.flash("error", "You can not use this route. Try another one!");
      res.redirect("/subjects/batch/" + batchId + "/course/" + courseId);
    } else {
      subject.name = name;
      subject.description = description;
      subject.batch = batchId;
      subject.course = courseId;
      await subject.save();
      req.flash("success", "Subject updated successfully");
      res.redirect("/subjects/batch/" + batchId + "/course/" + courseId);
    }
  }
};

controllers.remove = async (req, res) => {
  const { subjectId, batchId, courseId } = req.params;
  const subject = await Subject.findById(subjectId);
  if (!subject || req.user.school !== subject.school) {
    req.flash("error", "You can not remove this subject. Please try another one!");
    res.redirect("/courses");
  } else {
    await subject.remove();
    req.flash("success", "Subject removed successfully");
    res.redirect("/subjects/batch/" + batchId + "/course/" + courseId);
  }

};

module.exports = controllers;

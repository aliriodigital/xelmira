const { session } = require("passport");
const Subject = require("../../models/Subject");
const Batch = require("../../models/Batch");
const Course = require("../../models/Course");
const controllers = {};

controllers.read = async (req, res) => {
  const { batchId, courseId } = req.params;
  const course = await Course.findById(courseId).lean();
  const batch = await Batch.findById(batchId).lean();
  console.log(batch);
  const subject = await Subject.find({ $and: [{ school: req.user.school }, { course: courseId }, { batch: batchId }] }).lean();
  res.render("programmes/subjects", {
    pageTitle: "Subjects",
    featureTitle: "Manage Subjects",
    subjectLink: true,
    course: course,
    batch: batch,
    subject: subject,
  });
};

// controllers.getImport = async (req, res) => {
//   const { courseId } = req.params;
//   const batch = await Batch.find({ preset: true }).lean();
//   const course = await Course.findById(courseId).lean();
//   res.render("programmes/batch-import", {
//     pageTitle: "Import Batches",
//     featureTitle: "Import Batches",
//     courseLink: true,
//     batch: batch,
//     course: course,
//   })
// }

// controllers.postImport = async (req, res) => {
//   const { id, courseId } = req.params;
//   const data = req.body;
//   const batchArray = Object.keys(data).map(k => data[k]);
//   const buildNewBatches = async () => {
//     const batchArrayLength = batchArray.length;
//     let i;
//     for (i = 0; i < batchArrayLength; i++) {
//       const presetBatch = await Batch.find({ _id: batchArray[i] });
//       const batchInUse = await Batch.findOne({ $and: [{ school: req.user.school }, { course: courseId }, { name: presetBatch[0].name }] });
//       console.log(batchInUse);
//       if (batchInUse) {
//         req.flash("error", "No batch name duplicate is allowed. Please try again");
//         res.redirect("/batch/import/course/" + courseId);
//         break;
//       } else {
//         const newBatch = new Batch();
//         newBatch.course = courseId;
//         newBatch.preset = false;
//         newBatch.school = req.user.school;
//         newBatch.creatorUser = req.user.id;
//         newBatch.description = presetBatch[0].description;
//         newBatch.name = presetBatch[0].name;
//         newBatch.save();
//       }
//     }
//     req.flash("success", "Batches imported successfully");
//     res.redirect("/batches/course/" + courseId);
//   }
//   buildNewBatches();
// }


controllers.createView = async (req, res) => {
  const { batchId, courseId } = req.params;
  const course = await Course.findById(courseId).lean();
  const batch = await Batch.findById(batchId).lean();
  res.render("programmes/subject-new", {
    pageTitle: "Create Subject",
    featureTitle: "Create Subject",
    courseLink: true,
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
  console.log(course);
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

// controllers.edit = async (req, res) => {
//   const { id, courseId } = req.params;
//   const { name, description } = req.body;
//   if (name.length < 1) {
//     // req.session.name = name;
//     req.flash("error", "Please enter a name and try again");
//     res.redirect("/batch/edit/form/" + id + "/course/" + courseId);
//   } else {
//     const batch = await Batch.findById(id);
//     if (!batch || req.user.school !== batch.school) {
//       req.flash("error", "You can not use this route. Try another one!");
//       res.redirect("/batches/course/" + courseId);
//     } else {
//       batch.name = name;
//       batch.description = description;
//       batch.course = courseId;
//       await batch.save();
//       req.flash("success", "Batch updated successfully");
//       res.redirect("/batches/course/" + courseId);
//     }
//   }
// };

// controllers.remove = async (req, res) => {
//   const { id } = req.params;
//   const batch = await Batch.findById(id);
//   if (!batch || req.user.school !== batch.school) {
//     req.flash("error", "You can not remove this batch. Please try another one!");
//     res.redirect("/batches");
//   } else {
//     await batch.remove();
//     req.flash("success", "Batch removed successfully");
//     res.redirect("/batches/course/" + batch.course);
//   }

// };

module.exports = controllers;

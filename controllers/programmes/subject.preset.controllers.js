const { session } = require("passport");
const Subject = require("../../models/Subject");
const controllers = {};

controllers.read = async (req, res) => {
  const subject = await Subject.find({
    school: req.user.school,
    preset: true,
  }).lean();
  res.render("programmes/subject-presets", {
    pageTitle: "Subject Presets",
    featureTitle: "Manage Subject Presets",
    subjectPresetLink: true,
    subject: subject,
  });
};

controllers.createView = async (req, res) => {
  res.render("programmes/subject-preset-new", {
    pageTitle: "Create Preset Subject",
    featureTitle: "Create Preset Subject",
    subjectPresetLink: true,
    action: "/subject/preset/new",
  });
};

controllers.create = async (req, res) => {
  const { name, description } = req.body;
  console.log(name, description);
  const subjectInUse = await Subject.findOne({
    school: req.user.school,
    preset: true,
    name: name,
  });
  if (name.length < 1) {
    error = "Enter a name";
    res.render("programmes/subject-preset-new", {
      pageTitle: "New Subject Preset",
      featureTitle: "Create Subject Preset",
      subjectPresetLink: true,
      error: error,
      name: name,
      description: description,
    });
  } else if (subjectInUse) {
    const error = `${name} already exists. Try a different name`;
    res.render("programmes/subject-preset-new", {
      error: error,
      pageTitle: "Create Subject Presets",
      featureTitle: "Create Subject Preset",
      subjectPresetLink: true,
      name: name,
      description: description,
    });
  } else {
    const subject = new Subject(req.body);
    subject.batch = "n/a-preset";
    subject.course = "n/a-preset";
    subject.creatorUser = req.user.id;
    subject.school = req.user.school;
    subject.preset = true;
    await subject.save();
    req.flash("success", "Subject preset created successfully");
    res.redirect("/subject/presets");
  }
};

controllers.editView = async (req, res) => {
  const { subjectPresetId } = req.params;
  const subject = await Subject.findById(subjectPresetId).lean();
  if (!subject || subject.school.toString() !== req.user.school.toString()) {
    req.flash("error", "You can not access that route");
    res.redirect("/subject/presets");
  } else {
    res.render("programmes/subject-preset-edit", {
      pageTitle: "Edit Subject Preset",
      featureTitle: "Edit Subject Preset",
      subjectPresetLink: true,
      action: `/subject/preset/edit/${subjectPresetId}`,
      subject: subject,
    });
  }
};

controllers.edit = async (req, res) => {
  const { subjectPresetId } = req.params;
  const { name, description } = req.body;
  const subject = await Subject.findById(subjectPresetId);
  const subjectInUse = await Subject.findOne({
    school: req.user.school,
    name: name,
    _id: { $ne: subjectPresetId },
  });
  if (name.length < 1) {
    req.flash(
      "error",
      "The subject name field was blank. Please submit a name"
    );
    res.redirect("/subject/preset/edit/" + subjectPresetId);
  } else if (subjectInUse) {
    req.flash("error", `${name} is already taken. Try a different name`);
    res.redirect("/subject/preset/edit/" + subjectPresetId);
  } else {
    if (!subject || subject.school.toString() !== req.user.school.toString()) {
      req.flash("error", "You can not access that route.");
      res.redirect("/subject/presets");
    } else {
      subject.name = name;
      subject.description = description;
      await subject.save();
      req.flash("success", "Subject updated successfully");
      res.redirect("/subject/presets");
    }
  }
};

controllers.remove = async (req, res) => {
  const { subjectPresetId } = req.params;
  const subject = await Subject.findById(subjectPresetId);
  if (!subject || subject.school.toString() !== req.user.school.toString()) {
    req.flash("error", "You can not access that route");
    res.redirect("/subject/presets");
  } else {
    await subject.remove();
    req.flash("success", "Subject removed successfully");
    res.redirect("/subject/presets");
  }
};



module.exports = controllers;

const { session } = require("passport");
const Batch = require("../../models/Batch");
const controllers = {};

controllers.read = async (req, res) => {
  const batch = await Batch.find({$and:[ {school: req.user.school}, {preset: true} ]}).lean();
  res.render("programmes/batch-presets", {
    pageTitle: "Batch Presets",
    featureTitle: "Manage Batch Presets",
    batchPresetLink: true,
    batch: batch,
  });
};

controllers.createForm = async (req, res) => {
  res.render("programmes/batch-preset-new", {
    pageTitle: "Create Preset Batch",
    featureTitle: "Create Preset Batch",
    batchPresetLink: true,
  });
};

controllers.create = async (req, res) => {
  const { name, description } = req.body;
  const batchInUse = await Batch.findOne({ $and: [{school: req.user.school}, {preset: true}, {name: name}]});
  if (name.length < 1) {
    error = "Please enter a name and try again";
    res.render("programmes/batch-new", {
      error: error,
    });
  } else if (batchInUse) {
    const error = `${name} already exists. Please try another name`;
    res.render("programmes/batch-preset-new", {
      error: error,
      pageTitle: "Create Preset Batch",
      featureTitle: "Create Preset Batch",
      batchPresetLink: true,
      name: name,
      description: description,
    });
  } else {
    const batch = new Batch(req.body);
    batch.course = "n/a-preset";
    batch.creatorUser = req.user.id;
    batch.school = req.user.school;
    batch.preset = true;
    await batch.save();
    req.flash("success", "Preset Batch created successfully");
    res.redirect("/batch/presets");
  }
};

controllers.editForm = async (req, res) => {
  const { id } = req.params;
  const batch = await Batch.findById(id).lean();
  if (!batch || req.user.school !== batch.school) {
    req.flash("error", "You can not edit this batch. Please try another one!");
    res.redirect("/batch/presets");
  } else {
    res.render("programmes/batch-preset-edit", {
      pageTitle: "Edit Preset Batch",
      featureTitle: "Edit Preset Batch",
      batchPresetLink: true,
      batch: batch,
    });
  }
};

controllers.edit = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  if (name.length < 1) {
    req.session.name = name;
    req.flash("error", "Please enter a name and try again");
    res.redirect("/batch/preset/edit/form/" + id);
  } else {
    const batch = await Batch.findById(id);
    if (!batch ||  req.user.school !== batch.school) {
      req.flash("error", "You can not use this route. Try another one!");
      res.redirect("/batch/presets");
    } else {
      batch.name = name;
      batch.description = description;
      await batch.save();
      req.flash("success", "Batch updated successfully");
      res.redirect("/batch/presets");
    }
  }
};

controllers.remove = async (req, res) => {
  const { id } = req.params;
  const batch = await Batch.findById(id);
  if (!batch ||  req.user.school !== batch.school) {
    req.flash("error", "You can not remove this batch. Please try another one!");
    res.redirect("/batch/presets");
  } else {
    await batch.remove();
    req.flash("success", "Batch removed successfully");
    res.redirect("/batch/presets");
  }

};

module.exports = controllers;

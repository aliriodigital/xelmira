const Batch = require("../models/batch.model");

module.exports = {
  batchHome: async (req, res) => {
    const batch = await Batch.find().lean();
    res.render("batch", {
      dataCrud: batch,
      batchMenu: true,
      pageTitle: "Manage Batch",
      contentTitle: 'Manage Batch',
      newCrudButton: 'New Batch',
      newCrudTitleModal: 'Create New Batch',
      viewCrudTitleModal: 'View Batch Details',
      updateCrudTitleModal: 'Edit Batch',
      deleteCrudTitleModal: 'Delete batch'
    });
  },
  addBatch: async (req, res) => {
    const { name, description, startDate, endDate } = req.body;
    const batch = new Batch(req.body);
    await batch.save();
    req.flash('successMsg', 'Batch added successfully');
    res.redirect("/programmes/batch");
  },
  editBatch: async (req, res) => {
    const { id } = req.params;
    const { name, description, startDate, endDate } = req.body;
    await Batch.findByIdAndUpdate(id, {
      name: name,
      description: description,
      startDate: startDate,
      endDate: endDate
    });
    res.redirect("/programmes/batch");
  },
  deleteBatch: async (req, res) => {
    const { id } = req.params;
    await Batch.findByIdAndDelete(id);
    res.redirect("/programmes/batch");
  }
};

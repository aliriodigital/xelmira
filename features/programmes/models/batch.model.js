const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const batchSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("batch", batchSchema);

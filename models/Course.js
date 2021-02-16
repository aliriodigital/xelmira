const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    school: {
      type: String,
      required: true,
    },
    creatorUser: {
      type: String,
      required: true,
    },
    educationType: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("course", courseSchema);

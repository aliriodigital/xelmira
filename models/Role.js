const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema(
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
    }
  },
  { timestamps: true },
  { versionKey: false }
);

module.exports = mongoose.model("role", roleSchema);

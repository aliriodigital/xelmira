const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schoolSchema = new Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        }
    },
    { timestamps: true }, { versionKey: false }
);

module.exports = mongoose.model("school", schoolSchema);
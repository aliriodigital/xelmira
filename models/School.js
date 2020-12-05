const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schoolSchema = new Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        creatorUser: {
            type: String,
            required: true,
            default: "_tenant",
        }
    },
    { timestamps: true }, { versionKey: false }
);

module.exports = mongoose.model("school", schoolSchema);
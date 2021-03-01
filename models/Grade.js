const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const gradeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        electiveSubject: {
            type: Boolean,
        },
        creatorUser: {
            type: String,
            required: true,
            default: "_tenant",
        }, 
        school: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }, { versionKey: false }
);

module.exports = mongoose.model("grade", gradeSchema);
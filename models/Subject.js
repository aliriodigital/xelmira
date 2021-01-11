const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    batch: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    school: {
        type: String,
        required: true,
    },
    creatorUser: {
        type: String,
        required: true,
    },
    preset: {
        type: Boolean,
        default: false,
        required: true,
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("subject", subjectSchema);
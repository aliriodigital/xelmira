const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const batchSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
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
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("batch", batchSchema);
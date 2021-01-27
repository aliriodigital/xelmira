const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        school: {
            type: String,
            required: true,
        },
        creatorUser: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        middleName: String,
        lastName: {
            type: String,
            required: true,
        },
        phone: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("student", studentSchema);


















        // identificationType: {
        //     type: String,
        //     required: true,
        // },
        // identificationNumber: {
        //     type: String,
        //     required: true,
        // },
        // birth: {
        //     type: Date,
        //     required: true,
        // },
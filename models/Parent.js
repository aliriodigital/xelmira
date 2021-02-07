const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parentSchema = new Schema(
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
        student: {
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
        kinship: {
            type: String,
            required: true,
        },
        idType: {
            type: String,
            required: true,
        },
        idNumber: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        birthDate: {
            type: Date,
            required: true,
        },
        phone: String,
        mobile: String,
        address: String,
        notes: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("parent", parentSchema);


















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
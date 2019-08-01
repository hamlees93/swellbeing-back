// The employee will automatically get linked to their company as they sign up, through the company ID. They will be assigned active:false, until they go to /register/:id, and complete their own password. This will limit their access to the site. They will also hold all their previous checkins //

const { Schema } = require("mongoose");
const SurveySchema = require("./../schemas/SurveySchema");

const EmployeeSchema = new Schema({
    companyID: {
        type: Schema.Types.ObjectId,
        ref: "company",
        required: true
    },
    active: {
        type: Boolean,
        default: false
    },
    previousCheckins: [SurveySchema]
});

module.exports = EmployeeSchema;
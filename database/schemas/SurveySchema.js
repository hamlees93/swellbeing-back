// Surveys are set up under 4 categories, and they take a date stamp. As an employee completes questions, the categories are aggregated together to return one object per survey //

const { Schema } = require("mongoose");

let date = new Date();
let dd = date.getDate();
let mm = date.getMonth() + 1; //January is 0!

let yyyy = date.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
} 
if (mm < 10) {
  mm = '0' + mm;
} 
let newlyformattedDate = dd + '/' + mm + '/' + yyyy;

const SurveySchema = new Schema({
  surveyDate: {
    type: String,
    required: true,
    default: newlyformattedDate
  },
  physical: {
    type: Number
  },
  emotional: {
    type: Number
  },
  mental: {
    type: Number
  },
  social: {
    type: Number
  },
  overall: {
    type: Number
  }
});

module.exports = SurveySchema;

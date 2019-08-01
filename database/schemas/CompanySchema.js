// the company will hold all their questions, as well as how many questions their employees will be asked at a checkin. At the moment, this is limited to 20. The only info we require from company on rego, is location, this can obviously be added to and/or changed //

const { Schema } = require("mongoose");
const QuestionSchema = require("./QuestionSchema");

const CompanySchema = new Schema({
  location: {
    type: String
  },
  amountOfQuestionsToAsk: {
    type: Number,
    required: false,
    default: 8,
    min: 4,
    max: 20
  },
  questions: [QuestionSchema]
});

module.exports = CompanySchema;

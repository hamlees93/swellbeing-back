//// Seed file to create surveys, companies and users ////
//// For now there is no way to limit a company to only seeing their users, this will come later ////

require("dotenv").config();
const fs = require("fs");
require("./../config/database");

// const SurveyModsel = require("./models/survey_model");
const CompanyModel = require("./models/company_model");
const UserModel = require("./models/user_model");
const EmployeeModel = require("./models/employee_model");
const faker = require("faker");

const content = fs
  .readFileSync(__dirname + "/questions.csv")
  .toString()
  .split("\n");
let questions = [];
for (let line of content) {
  let words = line.split("+");
  questions.push({
    description: words[0],
    category: words[2],
    image: words[1]
  });
}

const companiesID = []

for (let i = 0; i < 10; i++) {
  const company = new CompanyModel({
    email: `company${i}@email.com`,
    name: `Company${i}`,
    questions,
    location: "Sydney"
  });
  const passwordandSave = async () => {
    try {
      await company.setPassword("password");
      await company.save();
    } catch (err) {
      console.log(err);
    }
  };
  passwordandSave();
  companiesID.push(company._id,company._id,company._id);
}

for (let i = 0; i < 30; i++) {
  const employee = new EmployeeModel({
    email: `employee${i}@email.com`,
    name: `Employee${i}`,
    companyID: companiesID[i],
    previousCheckins: [
      {
        physical: Math.floor(Math.random() * 100),
        emotional: Math.floor(Math.random() * 100),
        mental: Math.floor(Math.random() * 100),
        social: Math.floor(Math.random() * 100),
        overall: 50
      },
      {
        physical: Math.floor(Math.random() * 100),
        emotional: Math.floor(Math.random() * 100),
        mental: Math.floor(Math.random() * 100),
        social: Math.floor(Math.random() * 100),
        overall: 50
      },
      {
        physical: Math.floor(Math.random() * 100),
        emotional: Math.floor(Math.random() * 100),
        mental: Math.floor(Math.random() * 100),
        social: Math.floor(Math.random() * 100),
        overall: 50
      },
      {
        physical: Math.floor(Math.random() * 100),
        emotional: Math.floor(Math.random() * 100),
        mental: Math.floor(Math.random() * 100),
        social: Math.floor(Math.random() * 100),
        overall: 50
      },
      {
        physical: Math.floor(Math.random() * 100),
        emotional: Math.floor(Math.random() * 100),
        mental: Math.floor(Math.random() * 100),
        social: Math.floor(Math.random() * 100),
        overall: 50
      },
      {
        physical: Math.floor(Math.random() * 100),
        emotional: Math.floor(Math.random() * 100),
        mental: Math.floor(Math.random() * 100),
        social: Math.floor(Math.random() * 100),
        overall: 50
      },
      {
        physical: Math.floor(Math.random() * 100),
        emotional: Math.floor(Math.random() * 100),
        mental: Math.floor(Math.random() * 100),
        social: Math.floor(Math.random() * 100),
        overall: 50
      }
    ]
  });
  const passwordandSave = async () => {
    try {
      await employee.setPassword("password");
      await employee.save();
    } catch (err) {
      console.log(err);
    }
  };
  passwordandSave();
}

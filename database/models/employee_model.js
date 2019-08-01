// Both employee and company use the discriminator to fall under the UserModel //

const UserModel = require("./user_model");
const EmployeeSchema = require("./../schemas/EmployeeSchema");

const EmployeeModel = UserModel.discriminator("employee", EmployeeSchema);

module.exports = EmployeeModel;
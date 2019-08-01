// Both employee and company use the discriminator to fall under the UserModel //

const UserModel = require("./user_model");
const CompanySchema = require("./../schemas/CompanySchema");

const CompanyModel = UserModel.discriminator("company", CompanySchema);

module.exports = CompanyModel;
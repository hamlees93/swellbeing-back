// Simple middleware for various user cases - just to make code slightly more DRY //

const UserModel = require("./../database/models/user_model");

const isCompany = (req,res,next) => {
    req.user.type === "company" ? next() : res.redirect("http://swellbeing.s3-website-ap-southeast-2.amazonaws.com/survey");
};

const isEmployee = (req,res,next) => {
    req.user.type === "employee" ? next() : res.redirect("/questions");
};

const findAllUsersBelongingToCompany = async (req) => {
    const {_id: companyID} = req.user;
    const response = await UserModel.find({companyID});
    return response;
};

const findCompanyOfUser = async (req) => {
    const { companyID: id } = req.user;
    const user = await UserModel.findById(id);
    return user;
};

const findUserFromParams = async (req) => {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    return user;
};

module.exports = {
    isCompany,
    isEmployee,
    findAllUsersBelongingToCompany,
    findCompanyOfUser,
    findUserFromParams
};
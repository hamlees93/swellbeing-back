const UserModel = require("./../database/models/user_model");
const EmployeeModel = require("./../database/models/employee_model");
const MailerService = require("./../services/mailer_service");
const {
  findAllUsersBelongingToCompany,
  findUserFromParams
} = require("./../middleware/user");

// uses middleware to return company's users //
const index = async (req, res, next) => {
  try {
    const response = await findAllUsersBelongingToCompany(req);
    return res.json(response);
  } catch (err) {
    next(err);
  }
};

// create a new user. set their password to email. they will be unable to access the site, until they follow their email link and create their own password//
const create = async (req, res, next) => {
  console.log(req.body);
  const { _id: companyID, name: companyName } = req.user;
  const { email, name } = req.body;
  const password = email;
  const user = new EmployeeModel({ email, name, companyID });

  await EmployeeModel.register(user, password, async (err, user) => {
    if (err) {
      return next(err);
    }

    const response = await UserModel.find({ companyID });
    const inviteLink = `http://swellbeing.s3-website-ap-southeast-2.amazonaws.com/register/${
      user._id
    }`;
    await MailerService.sendInvite(email, name, companyName, inviteLink);
    return res.json(response);
  });
};

// Usual delete -find user and remove...wait for save //
const destroy = async (req, res, next) => {
  const user = await findUserFromParams(req);

  try {
    user.remove();
    await user.save();
    const response = await findAllUsersBelongingToCompany(req);
    return res.json(response);
  } catch (error) {
    next(error);
  }
};

// Links to button on usertable, where company can re-invite users who have not yet been 'activated'. This button dissapears as soon as they complete their own password //
const inviteUser = async (req, res, next) => {
  const user = await findUserFromParams(req);
  const { name: companyName } = req.user;
  const { email, name } = user;

  const inviteLink = `http://swellbeing.s3-website-ap-southeast-2.amazonaws.com/register/${
    user._id
  }`;
  try {
    MailerService.sendInvite(email, name, companyName, inviteLink);
    return res.json("Email sent successfully!");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  index,
  create,
  destroy,
  inviteUser
};

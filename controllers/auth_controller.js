const CompanyModel = require("./../database/models/company_model");
const UserModel = require("./../database/models/user_model");
const MailerService = require("./../services/mailer_service");
const JWTService = require("./../services/jwt_service");
const fs = require('fs');

const registerCompany = (req, res, next) => {
    const {email, password, name, location} = req.body;

    //// Reads through the questions file, splits on each line, then splits between each category to make the questions unique to each company ////
    const content = fs.readFileSync(__dirname + '/questions.csv').toString().split("\n");
    let questions = [];
    for (let line of content) {
        let words = line.split("+");
        questions.push({
            description: words[0],
            category: words[2],
            image: words[1]
        });
    }

    // Create a new user from the request body, and pass back their token //
    const user = new CompanyModel({ email, name, location, questions });

    CompanyModel.register(user, password,  (err, user) => {
        if (err) {
            return next(err)
        }
        const token = JWTService.createJWT(user);

        return res.json({ token });
    });
};

//// Verification is done in routes and database, so this function is purely to create JWT token ////
const login = (req, res) => {
    const user = req.user;
    if (user.type === "employee" && !user.active) return res.json(user)
    const token = JWTService.createJWT(user);
    return res.json({ token });
};

/// Sends the user's name and type  to the front end///
const userType = async (req, res, next) => {
    const value = req.user;
    res.json(value);
}; 

// Reset password by finding user and setting new password //
const resetPassword = async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.user.email })
    const { password } = req.body;
    try {
        await user.setPassword(password);
        await user.save();
    } catch (err) {
        console.log(err);
    }

    const token = JWTService.createJWT(user);

    return res.json({ token });
}

// Use mailer service to send a link to user, so they can reset their password //
const sendPasswordReset = async (req, res, next) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (user === null) {
        return res.json('error');
    }
    const token = JWTService.createJWT(user, '1d');
    const link = `http://swellbeing.s3-website-ap-southeast-2.amazonaws.com/confirm_reset/${encodeURIComponent(token)}`;
    await MailerService.resetPassword(email, user.name, link);
    return res.json('Password reset email sent successfully.');
}

module.exports = {
    registerCompany,
    login,
    userType,
    resetPassword,
    sendPasswordReset
};
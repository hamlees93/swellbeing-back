const UserModel = require("../database/models/user_model");
const JWTService = require("./../services/jwt_service");
const { findUserFromParams } = require("./../middleware/user");

// uses the id in the url to get and return the user. Probably not the most secure way. Would be better off using JWT //
const getUser = async (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    const user = await UserModel.findById(id);
  
    try {
        return res.json(user);
    } catch( err ) {
        next(err);
    }
};

// Pull email from body and use that to find user and update info; allowing them access to the site. They will continually be brought back to this form if they do not complete it //
const register = async (req, res, next) => {
    const user = await findUserFromParams(req);
    const { password, name, email } = req.body;
    try {
        user.active = true;
        if (name !== user.name) user.name = name
        await user.changePassword(email, password, (err, user) => {
            if (err) {
                return next(err)
            }
        });
        await user.save();
    } catch (err) {
        console.log(err);
    }

    const token = JWTService.createJWT(user);

    return res.json({ token });
};

module.exports = {
    getUser,
    register
}
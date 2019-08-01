// Service to create a JWT token //

const JWT = require("jsonwebtoken");

function createJWT(user, expiry = '1d'){
    const token = JWT.sign(
        {
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            subject: user._id.toString(),
            expiresIn: expiry
        }
    );
    return token;
}

module.exports = {
    createJWT
}
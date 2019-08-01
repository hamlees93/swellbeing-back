const express = require("express");
const router = express.Router();
const { celebrate, Joi } = require("celebrate");
const AuthController = require("./../controllers/auth_controller");
const AuthenticateLink = require("./../middleware/authenticate_link");
const passport = require("passport");

// Route to register company, with verification handled by Joi, as well as on the front end //
router.post("/registerCompany", celebrate({
    body: {
        email: Joi.string().email().trim().required(),
        password: Joi.string().required(),
        location: Joi.string(),
        name: Joi.string()
    }
}), AuthController.registerCompany);

// authenticate users details using passport. If wrong info is entered, an error message will appear on the front end //
router.post("/login", celebrate({
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}), passport.authenticate("local", { session: false}), AuthController.login);

// Actually ended up returning the user, not just the type, as we need their name as well //
router.get("/userType", passport.authenticate("jwt", { 
    session: false,
    failureRedirect: '/login'
    }), AuthController.userType
);

// Send user a rest password link //
router.post("/reset", AuthController.sendPasswordReset);

// Confirm password reset //
router.post("/confirm_reset", AuthenticateLink.authenticated, AuthController.resetPassword) 

module.exports = router;
const express = require("express");
const router = express.Router();
const AuthRoutes = require("./auth_routes");
const QuestionRoutes = require("./questions_routes");
const UserRoutes = require("./users_routes");
const CompanySummaryRoutes = require("./company_summary_routes");
const SurveyRoutes = require("./survey_routes");
const RegisterRoutes = require("./register_routes");
const DatabaseController = require("./../controllers/database_controller");
const User = require("../middleware/user");
const passport = require("passport");


router.use("/", AuthRoutes);

//// Routes for Admin...only accessible by 'company' ////
router.use(
    "/questions", 
    passport.authenticate("jwt", { 
        session: false,
        failureRedirect: '/login'
    }), 
    User.isCompany,
    QuestionRoutes
);

//// Routes for Admin...only accessible by 'company' ////
router.use(
    "/users", 
    passport.authenticate("jwt", { 
        session: false,
        failureRedirect: '/login'
    }), 
    User.isCompany,
    UserRoutes
);

//// Routes for Company to see performance of users ////
router.use(
    "/companySummary", 
    passport.authenticate("jwt", { 
        session: false,
        failureRedirect: '/login',
        failureMessage: 'You must be logged in to view this page' 
    }), 
    User.isCompany,
    CompanySummaryRoutes
);

////// Survey is only accessible to employees...not sure if neccessary /////
router.use(
    "/survey", 
    passport.authenticate("jwt", { 
        session: false,
        failureRedirect: '/login'
    }),
    User.isEmployee,
    SurveyRoutes
);

//// Route for user to access through email link ////
router.use(
    "/register",
    RegisterRoutes
);

////// Routes to get enums from Database /////
router.get("/database", DatabaseController.index);

module.exports = router;
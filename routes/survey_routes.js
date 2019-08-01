const express = require("express");
const router = express.Router();
const SurveyController = require("./../controllers/survey_controller");

// Route to get a new survey for the user to complete //
router.get("/", SurveyController.index);

// Route to post completed survey to database //
router.post("/", SurveyController.create);

// Route to get surveys previously completed by user to display in the history chart //
router.get("/usersurveys", SurveyController.userSurvey);

module.exports = router;

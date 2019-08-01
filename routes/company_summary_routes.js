const express = require("express");
const router = express.Router();
const CompanySummaryController = require('./../controllers/company_summary_controller');

// Route to get all surveys belonging to the users, belonging to a company //
router.get("/", CompanySummaryController.index);

module.exports = router;
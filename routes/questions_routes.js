// CRUD resource for questions, with the addition of 'amount' which is how many questions the company wants to ask their users //

const express = require("express");
const router = express.Router();
const QuestionController = require("./../controllers/question_controller");

router.get("/", QuestionController.index);

router.post("/", QuestionController.create);

router.get("/amount", QuestionController.getNumberOfQuestions);

router.put("/amount", QuestionController.updateNumberOfQuestions);
router.patch("/amount", QuestionController.updateNumberOfQuestions);

router.put("/:id", QuestionController.update);
router.patch("/:id", QuestionController.update);

router.delete("/:id", QuestionController.destroy);

module.exports = router;

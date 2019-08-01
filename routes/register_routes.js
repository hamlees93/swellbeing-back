// Routes for email link sent to user. The get will return the user info, so the form can be pre-filled. Whilst the post will send the user's password to the database, and log the user in //

const express = require("express");
const router = express.Router();
const RegisterController = require("../controllers/register_controller");

router.get("/:id", RegisterController.getUser);
router.post("/:id", RegisterController.register)

module.exports = router;
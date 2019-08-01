// Create and Delete resource for company to control and manage their users. Also 'inviteuser' will send a new email link to the user to remind them to sign up //

const express = require("express");
const router = express.Router();
const UserController = require("./../controllers/user_controller");

router.get("/", UserController.index);

router.post("/", UserController.create);

router.delete("/:id", UserController.destroy);

router.get("/invite/:id", UserController.inviteUser)

module.exports = router;

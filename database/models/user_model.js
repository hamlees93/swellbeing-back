// for the discriminator, the user model is set up as usual //

const mongoose = require("mongoose");
const UserSchema = require("./../schemas/UserSchema");

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
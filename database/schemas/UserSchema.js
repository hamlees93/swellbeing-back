// The only similar field for employees and companies is name (as password and email are taken care of by passport). Options allows us to select whether the UserModel is a 'company' or a 'employee' //

const { Schema } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const options = { discriminatorKey: "type" };

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  options
);

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = UserSchema;

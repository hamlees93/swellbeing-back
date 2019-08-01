// Used to configure the database when running the seed file //

const mongoose = require("mongoose");

mongoose.connect(
  process.env.DB_HOST,
  { useNewUrlParser: true }
);

mongoose.connection.on("error", error => console.log(error));

mongoose.Promise = global.Promise;

module.exports = mongoose;

// Unlike config connect, this is the actual database connection, not just for seeds //

const mongoose = require("mongoose");

mongoose.connect(
  process.env.DB_HOST,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
mongoose.connection.on("error", console.log);

module.exports = mongoose;

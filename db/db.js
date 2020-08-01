const mongoose = require("mongoose");
const db = require("../config/keys").mongoURI;

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("dB connection established successfully");
});

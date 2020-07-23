var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://samuel:OSUI66HHDXgAT2lx@cluster0-dottv.mongodb.net/notesDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  }
);
var connection = mongoose.connection;

connection.once("open", function() {
  console.log("dB connection established successfully");
});

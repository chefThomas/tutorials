require("dotenv").config();
const Mongoose = require("mongoose");

const url = process.env.MONGODBURI;

Mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false })
  .then(res => console.log("connecting to MongoDB"))
  .catch(err => console.log("couldn't connect to MongoDB", err.message));

const personSchema = new Mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  }
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Person = Mongoose.model("Person", personSchema);

module.exports = Person;

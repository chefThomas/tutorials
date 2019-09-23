const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  passwordHash: String,
  username: {
    type: String,
    unique: true
  },
  name: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    }
  ]
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
    returnedObject.id = returnedObject._id.toString();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

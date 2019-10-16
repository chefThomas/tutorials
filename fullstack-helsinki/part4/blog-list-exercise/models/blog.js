const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  addedBy: String
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString();
    returnedObject.id = returnedObject._id;
    // delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;

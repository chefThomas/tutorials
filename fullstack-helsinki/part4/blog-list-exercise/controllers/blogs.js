const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//middleware
const getTokenFromHeader = require("../middleware/getToken");

blogsRouter.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1
    });
    res.json(blogs.map(blog => blog.toJSON()));
  } catch (exception) {
    console.log(exception);
  }
});

blogsRouter.delete("/:id", async (req, res) => {
  try {
    // get blog id from req params
    const blogId = req.params.id;
    console.log("req params: ", blogId);
    // retrieve blog from db
    const returnedBlog = await Blog.findById(blogId);
    console.log(returnedBlog);
    // get user id from blog and convert to string
    const blogUserId = returnedBlog.user.toString();
    console.log("blog user id: ", blogUserId);
    // get token from req header (this is handled by middleware)
    const token = req.token;
    // decrypt token and retrieve userId
    const tokenPayload = jwt.verify(token, process.env.SECRET);

    console.log("token payload", tokenPayload);
    const tokenUserId = tokenPayload.userId;

    console.log("token user id: ", tokenUserId); // check

    // compare user ids between token and retrieved blog

    if (blogUserId !== tokenUserId) {
      return res.status(401).json({ error: "unauthorized operation" });
    } else {
      const result = await Blog.findByIdAndRemove(blogId);
      res.json({ deletedBlog: result });
    }
  } catch (ex) {
    // error handler
    // no blog found  (404)
    // ids dont match (401 unauthorized)
    console.log(ex);
  }
});

blogsRouter.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;
  const token = req.token;
  if (title && author && url && token) {
    try {
      const validated = jwt.verify(req.token, process.env.SECRET);
      // get userId from validated and retrieve user from db to get id object
      const user = await User.find({ _id: validated.userId });

      const blog = new Blog({
        title,
        author,
        url,
        likes: likes || 0,
        user: user[0]._id
      });

      const result = await blog.save();
      res.json(result);
    } catch (exception) {
      console.log(exception);
    }
  } else {
    res.status(401).json({ error: "something is missing" });
  }
});

blogsRouter.put("/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.json(updatedBlog.toJSON());
  } catch (exception) {
    console.log(exception);
  }
});

// blogsRouter.delete("/:id", async (req, res) => {
//   try {
//     const deletedNote = await Blog.findByIdAndRemove(req.params.id);
//     return deletedNote ? res.json(deletedNote.toJSON()) : res.status(404).end();
//   } catch (exception) {
//     res.send(exception);
//   }
// });

module.exports = blogsRouter;

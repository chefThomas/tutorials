const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

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
  // get token from req header
  console.log("req params id", req.params.id);
  const { result } = Blog.findByIdAndRemove(req.params.id);
  res.send(result);
});

blogsRouter.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;
  const token = req.token;
  console.log("token in post backend: ", token);
  if (token) {
    try {
      const validated = jwt.verify(req.token, process.env.SECRET);
      // get userId from validated and retrieve user from db to get id object
      const user = await User.findById(validated.userId);
      console.log("USER: ", user);

      const blog = new Blog({
        title,
        author,
        url,
        likes: likes || 0,
        user: user._id,
        addedBy: user.username
      });
      // save blog to db
      const result = await blog.save();
      // append blog id to users blog array
      console.log("posted blog: ", result);
      user.blogs = user.blogs.concat(result._id);
      await user.save();
      res.json(result);
    } catch (exception) {
      console.log(exception);
    }
  } else {
    res.status(401).json({ error: "unauthorized" });
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

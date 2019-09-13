const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (exception) {
    console.log(exception);
  }
});

blogsRouter.post("/", (req, res) => {
  const blog = new Blog(req.body);

  if (!blog.likes) {
    blog.likes = 0;
  }

  if (!blog.title || !blog.url) {
    return res.status(400).json({ error: "must include blog title and url" });
  }

  blog.save().then(result => {
    res.status(200).json(result.toJSON());
  });
});

blogsRouter.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Blog.findByIdAndRemove(req.params.id);
    return deletedNote ? res.json(deletedNote.toJSON()) : res.status(404).end();
  } catch (exception) {
    res.send(exception);
  }
});

module.exports = blogsRouter;

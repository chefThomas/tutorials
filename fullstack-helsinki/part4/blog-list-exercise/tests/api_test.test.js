const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");
const api = supertest(app);
const Blog = require("../models/blog");
const { blogs } = require("./api_test_helper");

// prep db for testing
beforeEach(async () => {
  // clear db
  await Blog.deleteMany({});

  // create blog posts and save to db
  const newBlogsPromise = blogs.map(async blog => {
    const newBlog = new Blog(blog);
    return await newBlog.save();
  });

  return await Promise.all(newBlogsPromise);
});

// initialization
describe("confirm test db initializes", () => {
  // test get requests returns json
  test("returns json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returns 4 blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body.length).toBe(4);
  });
});

// test initilization
afterAll(() => {
  mongoose.connection.close();
});

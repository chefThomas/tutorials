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

  // create blog posts and save to db#
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

describe("test blog properties", () => {
  test("confirms blogSchema.toJSON() works: remove _id and replace with id", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

describe("post tests", () => {
  test("posts blog", async () => {
    // create new note
    const blog = {
      title: "test blog",
      author: "test author",
      url: "http://test.com",
      likes: 0
    };

    await api
      .post("/api/blogs")
      .send(blog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    expect(response.body.length).toBe(5);

    const titles = response.body.map(blog => blog.title);
    expect(titles).toContain("test blog");
  });

  test("likes defaults to zero if not in post", async () => {
    const blog = {
      title: "no likes",
      author: "no one likes this author",
      url: "http://test.com"
    };

    await api
      .post("/api/blogs")
      .send(blog)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const response = await api.get("/api/blogs");
    // get last blog posted and test if it detaulted to zero
    let lastBlog = response.body.filter(blog => blog.title === "no likes");
    lastBlog = lastBlog[0];
    expect(lastBlog.likes).toBe(0);
  });

  test("returns 400 if url or title omitted from post", async () => {
    const blog1 = {
      url: "http://www.toughguys.com",
      author: "fedor emelianenko",
      likes: 0
    };

    const blog2 = {
      title: "mma fighters",
      author: "fedor emelianenko",
      likes: 0
    };

    await api
      .post("/api/blogs")
      .send(blog1)
      .expect(400);

    await api
      .post("/api/blogs")
      .send(blog2)
      .expect(400);
  });
});

describe("delete post", () => {
  // get id
  test("deletes post", async () => {
    const results = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(results.body.length).toBe(4);
    const id = results.body[0].id;
    await api.delete(`/api/blogs/${id}`).expect(200);

    const remainingBlogs = await api.get("/api/blogs");
    const remainingBlogsIds = remainingBlogs.body.map(blog => blog.id);
    expect(remainingBlogsIds).not.toContain(id);
    expect(remainingBlogs.body.length).toBe(blogs.length - 1);
  });
});

// test initilization
afterAll(() => {
  mongoose.connection.close();
});

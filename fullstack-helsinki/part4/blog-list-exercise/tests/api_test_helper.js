const User = require("../models/user");

const blogs = [
  {
    title: "capitol",
    author: "piketty",
    url: "http://goodstuff.com",
    likes: 458
  },
  {
    title: "newspaper",
    author: "someone",
    url: "http://goodstuff.com",
    likes: 900
  },
  {
    title: "lucky 13 sauce",
    author: "mr chung",
    url: "http://goodstuff.com",
    likes: 900
  },
  {
    title: "seriously awesome",
    author: "amanda coffee",
    url: "http://girls.com",
    likes: 900
  }
];

const users = [
  {
    name: "tom",
    username: "newdevrising",
    password: "passwerd"
  },
  {
    name: "sally",
    username: "computer",
    password: "passwerd"
  }
];

module.exports = {
  blogs,
  users,
  getRandomUserId
};

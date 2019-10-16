const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.post("/", async (req, res, next) => {
  const { username, password, name } = req.body;

  if (!(username && password)) {
    return res.status(401).json({ error: "must enter username and password" });
  }

  if (!(username.length >= 3 && password.length >= 3)) {
    return res.status(401).json({
      error: "username and password must be at least 3 characters long"
    });
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name: name,
      username: username,
      passwordHash: passwordHash
    });

    const savedUser = await newUser.save();
    return res.json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.find({}).populate("blogs", {
      title: 1,
      author: 1,
      url: 1
    });
    console.log(users);
    return res.json(users.map(user => user.toJSON()));
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;

const loginRouter = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

loginRouter.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const [user] = await User.find({ username: username });

    if (!user) {
      return res.send({ message: "user not found" });
    }

    const passwordValidate = await bcrypt.compare(password, user.passwordHash);
    if (!user || !passwordValidate) {
      console.log("unauthorized");
      return res.send({ message: "unauthorized" });
    } else {
      const payload = {
        username: user.username,
        userId: user._id.toString()
      };

      console.log("token payload: ", payload);

      const token = jwt.sign(payload, process.env.SECRET);

      res.status(200).json({ token, currentUsername: user.username });
    }
  } catch (exception) {
    console.log("catch in login", exception.message);
    res.status(401).json({ message: "wrong user or password" });
  }

  // generate token
});

module.exports = loginRouter;

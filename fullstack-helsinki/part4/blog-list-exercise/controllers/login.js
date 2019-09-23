const loginRouter = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

loginRouter.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log("UN", username, "PW", password);
    const user = await User.find({ username: username });
    // verify pw
    const passwordValidate = await bcrypt.compare(
      password,
      user[0].passwordHash
    );

    if (!(user && passwordValidate)) {
      return res.status(401).json({ error: "invalid username or password" });
    } else {
      // generate token payload
      const payload = {
        username: user[0].username,
        userId: user[0]._id.toString()
      };

      console.log("token payload: ", payload);

      const token = await jwt.sign(payload, process.env.SECRET);

      res.status(200).json({ token, user: user });
    }
  } catch (exception) {
    console.log("catch in login", exception);
  }

  // generate token
});

module.exports = loginRouter;

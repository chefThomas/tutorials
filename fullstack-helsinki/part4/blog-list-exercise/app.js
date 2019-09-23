const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const { MONGOURL } = require("./utils/config");

//custom middleware helpers
const extractTokenFromReq = require("./middleware/getToken");

mongoose
  .connect(MONGOURL, { useNewUrlParser: true, useFindAndModify: false })
  .then(res => console.log(`connected to ${MONGOURL}`))
  .catch(err => console.log("in app: ", err));

app.use(cors());
app.use(bodyParser.json());
app.use(extractTokenFromReq);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

module.exports = app;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const { MONGOURL } = require("./utils/config");

mongoose
  .connect(MONGOURL, { useNewUrlParser: true, useFindAndModify: false })
  .then(res => console.log(`connected to ${MONGOURL}`))
  .catch(err => console.log("in app: ", err));

app.use(cors());
app.use(bodyParser.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;

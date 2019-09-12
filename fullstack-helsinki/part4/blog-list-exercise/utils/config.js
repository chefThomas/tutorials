require("dotenv").config();

let MONGOURL = process.env.MONGOURL;
let PORT = process.env.PORT;

if (process.env.NODE_ENV === "test") {
  MONGOURL = process.env.TESTMONGOURL;
}

module.exports = {
  MONGOURL,
  PORT
};

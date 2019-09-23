require("dotenv").config();

let MONGOURL = process.env.MONGOURL;
let PORT = process.env.PORT;

if (process.env.NODE_ENV === "test") {
  MONGOURL = process.env.TESTMONGOURL;
} else if (process.env.NODE_ENV === "development") {
  MONGOURL = process.env.DEVMONGOURL;
}

module.exports = {
  MONGOURL,
  PORT
};

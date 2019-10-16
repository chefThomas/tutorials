const errorHandler = (err, req, res, next) => {
  switch (err.statusCode) {
    case 404:
      err.message = "User does not exist";
      break;
    case 401:
      err.message = "Incorrect password";
      break;
    default:
      err.message = "something went wrong";
  }
  console.log("error is: ", err.statusCode);
  res.json({ status: err.statusCode, message: err.message });
  next(err);
};

module.exports = errorHandler;

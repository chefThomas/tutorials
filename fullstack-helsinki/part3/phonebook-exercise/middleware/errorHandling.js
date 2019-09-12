const errorHandler = (err, req, res, next) => {
  console.log("error handler called ", err);
  console.log(error);
  // handle specific error type here

  next(error);
};

const validationErrorHandler = (err, req, res, next) => {
  const { message } = err;
  if (message.includes("Person validation failed")) {
    return res.status(400).json({ message });
  }

  next(err);
};

module.exports = { validationErrorHandler, errorHandler };

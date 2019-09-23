function extractTokenFromReq(req, res, next) {
  const auth = req.get("Authorization");
  if (auth && auth.toLowerCase().startsWith("bearer")) {
    // index of token string
    req.token = auth.substring(7);
  }
  next();
}

module.exports = extractTokenFromReq;

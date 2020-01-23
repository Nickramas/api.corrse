const jwt = require('jsonwebtoken');

function checkAccessToken(req, res, next) {
  try {
    const token = extractAccessToken(req);
    const tokenInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next(tokenInfo);
  } catch (err) {
    res.sendStatus(401);
  }
}

function extractAccessToken(req) {
  const authHeader = req.header('Authorization');
  const token = authHeader.replace('Bearer ', '');
  return token;
}

module.exports = checkAccessToken;

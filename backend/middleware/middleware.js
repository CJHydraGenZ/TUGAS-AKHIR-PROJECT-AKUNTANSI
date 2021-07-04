require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("auth");

  if (!token) {
    return res.status(401).json({
      status: false,
      msg: "tidak ada token",
    });
  }

  const decode = jwt.verify(token, process.env.JWT);
  req.id = decode.id;
  next();
};

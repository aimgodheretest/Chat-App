const jwt = require("jsonwebtoken");
const User = require("../Models/userTable");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        message: "Token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.userId);

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

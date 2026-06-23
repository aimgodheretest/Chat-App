const jwt = require("jsonwebtoken");
const User = require("../Models/userTable");

const socketAuth = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication Error"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return next(new Error("User Not Found"));
    }

    socket.user = user;

    next();
  } catch (err) {
    next(new Error("Authentication Error"));
  }
};

module.exports = socketAuth;

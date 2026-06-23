const { Server } = require("socket.io");

const socketMiddleware = require("./middleware");
const chatHandler = require("./handlers/chat");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.use(socketMiddleware);

  io.on("connection", (socket) => {
    chatHandler(io, socket);
  });

  return io;
};

module.exports = initializeSocket;

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const sequelize = require("./utils/db");

const userRoutes = require("./Routes/userRouter");
const chatRoutes = require("./Routes/chatRouter");

const User = require("./Models/userTable");
const Message = require("./Models/messageTable");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);

//ASSOCIATIONS:-
User.hasMany(Message);
Message.belongsTo(User);

// Socket Connection
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

sequelize
  .sync()
  .then(() => {
    console.log("Database Connected");

    server.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = io;

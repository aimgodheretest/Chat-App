const express = require("express");
const cors = require("cors");
require("dotenv").config();

const http = require("http");

const sequelize = require("./utils/db");

const userRoutes = require("./Routes/userRouter");
const chatRoutes = require("./Routes/chatRouter");

const User = require("./Models/userTable");
const Message = require("./Models/messageTable");
const ArchivedChat = require("./Models/archivedChatTable");

const initializeSocket = require("./socket-io");

const mediaRoutes = require("./Routes/mediaRouter");
require("./Jobs/archiveChats");
const aiRoutes = require("./Routes/aiRouter");

const app = express();

const server = http.createServer(app);

initializeSocket(server);

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);

app.use("/media", mediaRoutes);
app.use("/ai", aiRoutes);

//ASSOCIATIONS:-
User.hasMany(Message);
Message.belongsTo(User);

User.hasMany(ArchivedChat);
ArchivedChat.belongsTo(User);

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

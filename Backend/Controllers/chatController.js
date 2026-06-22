const Message = require("../Models/messageTable");
const User = require("../Models/userTable");
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    const chat = await Message.create({
      message,
      userId: req.user.id,
    });

    res.status(201).json({
      message: "Message stored",
      data: chat,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    res.status(200).json(messages);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
module.exports = {
  sendMessage,
  getMessages,
};

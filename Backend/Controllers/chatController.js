const Message = require("../Models/messageTable");

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
module.exports = {
  sendMessage,
};

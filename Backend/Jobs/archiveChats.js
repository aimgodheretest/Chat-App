const cron = require("node-cron");

const { Op } = require("sequelize");

const Message = require("../Models/messageTable");
const ArchivedChat = require("../Models/archivedChatTable");

cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Running Archive Job...");

    const oneDayAgo = new Date();

    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const oldMessages = await Message.findAll({
      where: {
        createdAt: {
          [Op.lt]: oneDayAgo,
        },
      },
    });

    if (oldMessages.length === 0) {
      console.log("No old messages found.");

      return;
    }

    const archivedMessages = oldMessages.map((msg) => ({
      message: msg.message,
      createdAt: msg.createdAt,
      updatedAt: msg.updatedAt,
      userId: msg.userId,
    }));

    await ArchivedChat.bulkCreate(archivedMessages);

    await Message.destroy({
      where: {
        createdAt: {
          [Op.lt]: oneDayAgo,
        },
      },
    });

    console.log(`${oldMessages.length} messages archived.`);
  } catch (err) {
    console.log(err);
  }
});

const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const Message = sequelize.define("message", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Message;

const { DataTypes } = require("sequelize");

const sequelize = require("../utils/db");

const ArchivedChat = sequelize.define("archivedChat", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = ArchivedChat;

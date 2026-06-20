const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },

  phone: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;

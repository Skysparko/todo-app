const { createDB } = require("../config/db");
const { DataTypes } = require("sequelize");

//creating table/schema/model for and giving it the (name,{options})
const Todo = createDB.define("todo-db", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: DataTypes.STRING,
  completed: DataTypes.BOOLEAN,
  priority: DataTypes.INTEGER,
  dueDate: DataTypes.DATE,
});

module.exports = Todo;

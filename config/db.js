const { Sequelize } = require("sequelize");

//creating new database and giving (db-name,user,password)
const createDB = new Sequelize("Todo", "skysparko", "skysparko12", {
  dialect: "sqlite",
  host: "./config/db.sqlite",
});

//checking whether the connection is established with database or not
const connectDB = () => {
  createDB
    .sync()
    .then(() => {
      console.log("Db is connected");
    })
    .catch(() => {
      console.log("db is not connected");
    });
};

module.exports = { createDB, connectDB };

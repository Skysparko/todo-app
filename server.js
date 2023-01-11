const express = require("express");
const app = express();
const { connectDB } = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/todo", todoRoutes);

//listing to the server on given port
app.listen(3000, () => {
  console.log("Server is live on http://localhost:3000");
  connectDB();
});

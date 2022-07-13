const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const colors = require("colors");
const port = process.env.PORT;
const connectDB = require("./config/db");
const routes = require("./routes/recipeRoute");
const userRoutes = require("./routes/userRoute");

//connect database
connectDB();

//initialize app
const app = express();

//middleware use
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app routing
app.use("/api/recipes", routes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

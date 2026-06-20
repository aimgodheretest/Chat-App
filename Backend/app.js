const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./utils/db");
const userRoutes = require("./Routes/userRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Database Connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

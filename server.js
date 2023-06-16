require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 8081;

const start = () => {
  try {
    // await mongoose.connect(process.env.DB_HOST);
    console.log("Database connection successful");
    app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();

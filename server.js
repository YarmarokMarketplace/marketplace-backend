require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 8081;

const start = async () => {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log("Database connection successful");
    app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
};

start().catch(console.dir);

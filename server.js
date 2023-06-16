require("dotenv").config();
const mongo = require('./db/mongo-client');
const app = require("./app");
const client = require("./db/mongo-client");

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

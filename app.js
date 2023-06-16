const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const path = require('path');

// const authRouter = require("./routes/api/auth/auth-routes");
// const noticeRouter = require("./routes/api/notices/notices-routes");
// const userRouter = require("./routes/api/user/user-routes");

const app = express();
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});


app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.render('index', {
      heading: 'YarmarOK',
      text: 'Some text',
      time: (new Date().toUTCString())
  })
})

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.get('/', (req, res) => {
  res.render('index', {title: 'Hey', message: 'Hello World!'});
});

app.use(logger(formatsLogger));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use(express.static("public"));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use("/api/auth", authRouter);
// app.use("/api/notices", noticeRouter);
// app.use("/api/user", userRouter);


app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

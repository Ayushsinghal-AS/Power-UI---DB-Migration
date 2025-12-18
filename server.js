require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const port = process.env.PORT || 8080;
const router = require("./controllers/index");
const logger = require("morgan");
const rateLimit = require("express-rate-limit");
const { corsOption } = require("./config/corsConfig");
const { limiter } = require("./config/rateLimitConfig");
const app = express();
const server = require("http").createServer(app);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOption));
app.use(helmet());
app.use(rateLimit(limiter));
app.use(logger("dev"));


app.get("/", async (req, res) => {
  return res.status(200).send(
    `<h1 style="height:100vh; display:flex;justify-content:center;align-items:center">
      Welcome to the Power UI Platform!
      </h1>`
  );
});

app.use("/api", router);

server.listen(port, () => {
  console.log("Server is running at port : " + port);
});

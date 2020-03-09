require("dotenv").config();
// const models = require("./models");
const cors = require("cors");
const routes = require("./routes");
const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

routes(app);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "You are not authorized." });
  } else {
    next(err);
  }
});

app.listen(port);
console.log(`great you have connected to RESTful API, STARTED on : ${port}`);

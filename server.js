
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 3001;
require("dotenv").config({ path: ".env" });

app.use(cors());

require('./connections')

global.serverPath = __dirname; 
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(express.static(__dirname + "public")); 

app.use(function (req, res, next) {
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, PUT, OPTIONS, DELETE, GET"
    );
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use("/server/health", (req, res, next) => {
    res.send({ success: true, message: "Server is running.." });
});

app.use("/api/dogimage", require("./routes/dogimage"));
app.use("/api/user", require("./routes/user"));

app.listen(process.env.PORT, function () {
  console.log(`Server is running on ${process.env.PORT}...`);
});

module.exports.app = app;
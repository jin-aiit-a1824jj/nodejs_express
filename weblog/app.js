var systemLogger = require("./lib/log/systemlogger");
var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.disable("x-powered-by");

app.use("/public", express.static( __dirname + "/public/" + (process.env.NODE_ENV === "development" ? "development" : "production")));

app.use("/", require("./routes/index.js"));

app.use(systemLogger());

//---
//var logger = require("./lib/log/logger").application;
// logger.addContext("key", "test");
// logger.error("message");
//logger.error("test", "message2");
//---

app.listen(3000);

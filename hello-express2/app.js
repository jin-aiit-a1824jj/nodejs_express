var express = require("express");
var app = express();

app.set("view engine","ejs");

app.use("/public", express.static(__dirname + "/public"));

app.use("/", require("./routes/index"));

app.listen(3000);
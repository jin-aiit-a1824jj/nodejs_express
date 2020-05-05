var express = require("express");
var app = express();

app.use(require("./logger"));

app.get("/",(req, res)=>{
  //res.writeHead(200);
  //res.write("Hello World");

  res.status(200).send("Hello World.");

});
app.listen(3000);
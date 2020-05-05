var express = require("express");
var app = express();

app.use(require("./logger"));

app.get("/",(req, res)=>{
  //res.writeHead(200);
  //res.write("Hello World");
  res.status(200).send("Hello World.");
});

app.get("/home/index",(req, res)=>{
  res.status(200).send("Ok.");
});

app.get("/guest/:id",(req, res)=>{
  console.log(req.params.id);
  res.status(200).send("Ok. /guest");
});

app.get("/guest/:id?",(req, res)=>{
  console.log(req.params.ids);
  res.status(200).send("Ok. /guest/?");
});

app.use("/user", require("./user"));

app.listen(3000);
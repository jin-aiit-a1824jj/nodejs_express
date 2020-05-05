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

app.get("/pug",(req, res)=>{
  app.set("view engine", "pug");
  res.status(200).render("index.pug",{ title: "Webアプリケーション開発"});
});

app.get("/jade",(req, res)=>{
  app.set("view engine", "jade");
  res.status(200).render("index.jade",{ title: "Webアプリケーション開発"});
});

app.get("/ejs",(req, res)=>{
  app.set("view engine", "ejs");
  res.status(200).render("index.ejs",{ title: "Webアプリケーション開発"});
});

app.get("/hjs",(req, res)=>{
  app.set("view engine", "hjs");
  res.status(200).render("index.hjs",{ title: "Webアプリケーション開発"});
});

app.listen(3000);
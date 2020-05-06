const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.all("/", (req, res) => {
  var body = "";
  console.log(req.method);
  console.log(req.url);
  console.log(JSON.stringify(req.headers));
  
  req.on("data", (chunk)=>{
    body += chunk;
  });
  req.on("end", ()=>{
    console.log("OK");
  });

  res.send("OK");

});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/postdata", (req, res)=>{
  res.render("./index.ejs");
});

app.post("/postdata", (req, res)=>{
  res.send("OK");
});

app.get("/queryinfo", (req, res)=>{
  res.render("./index-queryinfo.ejs");
  //console.log(req);
});

app.get("/headerinfo", (req, res)=>{
  console.log(req.get("user-agent"));
  res.set("Cache-Control", "no-cache");
  res.set("Pragma", "no-chche");
  res.render("./index.ejs");
});

app.listen(3000);
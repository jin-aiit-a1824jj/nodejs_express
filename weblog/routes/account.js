var { CONNECTION_URL, OPTIONS, DATABASE } = require("../config/mongodb.config.js");
var MongoClient = require("mongodb").MongoClient;
var router = require("express").Router();
var tokens = new require("csrf")();


var createRegistData = function (body) {
  var datetime = new Date();
  return {
    url: body.url,
    published: datetime,
    update: datetime,
    title: body.title,
    content: body.content,
    keywords: (body.keywords || "").split(","),
    authors: (body.authors || "").split(","),
  };
};

var validateRegistData = function(body){
  var isValidated = true, errors = {};

  if(!body.url){
    isValidated = false;
    errors.url = "URLが未入力です。'/'から始まるURLを入力してください。";
  }

  if(body.url && /^\//.test(body.url) === false){
    isValidated = false;
    errors.url = "'/'から始まるURLを入力してください。";
  }

  if(!body.title){
    isValidated = false;
    errors.title = "タイトルが未入力です。任意のタイトルを入力してください。";
  }


  return isValidated? undefined : errors;
}

router.get("/", (req, res)=>{
  res.render(__dirname + "/../views/account/index.ejs");
});

router.get("/posts/regist", (req, res)=>{
  tokens.secret((error, secret) => {
    var token = tokens.create(secret);
    req.session._csrf = secret;
    res.cookie("_csrf", token);
    res.render(__dirname + "/../views/account/posts/regist-form.ejs");
  });
});

router.post("/posts/regist/input", (req, res)=>{
  var original = createRegistData(req.body);
  res.render(__dirname + "/../views/account/posts/regist-form.ejs", { original });
});

router.post("/posts/regist/confirm", (req, res)=>{
  var original = createRegistData(req.body);
  var errors = validateRegistData(req.body);
  if(errors){
    res.render(__dirname + "/../views/account/posts/regist-form.ejs", { errors, original });
    return;
  }
  res.render(__dirname + "/../views/account/posts/regist-confirm.ejs", { original });
});

router.post("/posts/regist/execute", (req, res)=>{

  var secret = req.session._csrf;
  var token = req.cookies._csrf;

  if (tokens.verify(secret, token) === false){
    throw new Error("Invalid Token");
  }

  var original = createRegistData(req.body);
  var errors = validateRegistData(req.body);
  if(errors){
    res.render(__dirname + "/../views/account/posts/regist-form.ejs", { errors, original });
    return;
  }

  MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
    var db = client.db(DATABASE);
    db.collection("posts").insertOne(original)
    .then(()=>{
      delete req.session._csrf;
      res.clearCookie("_csrf");
      res.render(__dirname + "/../views/account/posts/regist-complete.ejs");
    }).catch((error)=>{
      throw error;
    }).then(()=>{
      client.close();
    });
  });

  
});

module.exports = router;
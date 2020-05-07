var {CONNECTION_URL, OPTIONS, DATABASE} = require("../config/mongodb.config.js")
var router = require("express").Router();
var MongoClient = require("mongodb").MongoClient;

router.get("/*", (req, res) => {
  MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
    var db = client.db(DATABASE);
    
    db.collection("posts").findOne({
      url: req.url
    }).then((doc)=>{
      res.render(__dirname + "/../views/posts/index.ejs", doc);
    }).catch((error)=>{
      throw error;
    }).then(()=>{
      client.close();
    });

  });
});

module.exports = router;
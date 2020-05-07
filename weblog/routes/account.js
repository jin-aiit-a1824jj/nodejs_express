var router = require("express").Router();

router.get("/", (req, res)=>{
  res.render(__dirname + "/../views/account/index.ejs");
});

module.exports = router;
var router = require("express").Router();

router.get("/", (req, res) => {
  throw new Error("Hello Error!");
  res.render( __dirname + "/../views/index.ejs");
});

module.exports = router;
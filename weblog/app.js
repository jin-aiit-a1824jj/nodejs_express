var {SESSION_SECRET} = require("./config/app.config.js").security
var systemLogger = require("./lib/log/systemlogger.js");
var accessLogger = require("./lib/log/accesslogger.js");
var accountcontrol = require("./lib/security/accountcontrol.js");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");
var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.disable("x-powered-by");

app.use("/public", express.static( __dirname + "/public/" + (process.env.NODE_ENV === "development" ? "development" : "production")));

app.use(accessLogger());

app.use(cookieParser());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  name: "sid"
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(flash());
app.use(...accountcontrol.initialize());

app.use("/api", (()=>{
  var router = express.Router();
  router.use("/posts", require("./api/posts.js"));
  return router
})());

app.use("/", (()=>{
  var router = express.Router();
  router.use((req, res, next)=>{
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    next();
  });
  router.use("/posts/", require("./routes/posts.js"));
  router.use("/search", require("./routes/search.js"));
  router.use("/account/", require("./routes/account.js"));
  router.use("/", require("./routes/index.js"));
  return router;
})());



app.use(systemLogger());

app.listen(3000);

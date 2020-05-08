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

app.use("/", require("./routes/index.js"));
app.use("/posts/", require("./routes/posts.js"));
app.use("/search", require("./routes/search.js"));
app.use("/account/", require("./routes/account.js"));
app.use("/api/posts", require("./api/posts.js"));

app.use(systemLogger());

app.listen(3000);

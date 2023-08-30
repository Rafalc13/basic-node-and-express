let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use("/public", express.static( __dirname + "/public"));

app.use((req, res, next) => {
  let {method, path, ip} = req;
  //console.log(method + " " + path + " - " + ip);
  next();
});


app.get("/", (req, res) => {
 // res.send("Hello Express");
  res.sendFile( __dirname + "/views/index.html");git init
});

app.get("/json", (req, res) => {
  res.json({"message": process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON": "Hello json"});
});

app.get("/:word/echo", (req, res) => {
  res.json({echo: req.params.word});
});

app.get("/name", (req, res) => {
  res.json({ name: req.query.first + " " + req.query.last});
});

app.post("/name", (req, res) => {
  res.json({ name: req.body.first + " " + req.body.last });
});

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({time: req.time});
});

console.log("Hello World");


module.exports = app;

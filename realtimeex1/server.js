var express = require("express");
var ws = require("./ws");

var app = express();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/ws.html");
});

app.listen(3000, function () {
  console.log("app listen on port 3000");
});

var Server = require("ws").Server;
var port = process.env.PORT || 9030;
var ws = new Server({ port: port });

console.log("Server started");

ws.on("connection", function (w) {
  w.on("message", function (msg) {
    console.log("message from client");
  });

  w.on("close", function () {
    console.log("closing connection");
  });

  console.log("server started");
});

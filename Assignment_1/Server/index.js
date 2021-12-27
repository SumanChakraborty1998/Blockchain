const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  socket.on("chat message", ({ name, msg }) => {
    console.log(name, msg);
    io.emit("chat message", { name, msg });
  });
});

http.listen(4000, function () {
  console.log("listening on :4000");
});

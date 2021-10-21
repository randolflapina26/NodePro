const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/messenger', (req, res) => {
  res.sendFile(__dirname + '/html/index.html');
});

io.on('connection', (socket) => {
    //console.log('a user connected');
    socket.on('disconnect', () => {
      //console.log('user disconnected');
    });
  });


io.on('connection', (socket) => {
  socket.on('chat message', (msg, name) => {
    io.emit('chat message', msg, name);
  });

  socket.on('new user', (name) => {
    io.emit('new user', name);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
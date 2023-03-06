const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.get('/chat/:id', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(5001, () => {
  console.log('listening on: 5001');
});
// This file is executed in the browser, when people visit /chat/<random id>
var express = require('express');
var router = express.Router();
var io = require('socket.io')(80);

var chat = io
  .of('/chat')
  .on('connection', function (socket) {
    socket.emit('a message', {
        that: 'only'
      , '/chat': 'will get'
    });
    chat.emit('a message', {
        everyone: 'in'
      , '/chat': 'will get'
    });
  });

module.exports = router;
//module.exports = function (io){}


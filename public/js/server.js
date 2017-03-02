//chat server
var express = require("express");
var app = express();
var port = 3700;

var server = require('http').createServer(app);
var io = require('socket.io')(server);

//connection handler
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'Welcome to the chat!' });
    // send message
    socket.on('send', function (data) {
        io.sockets.emit('message', { username: socket.username, message: data.message });
    });
});

server.listen(3700);
// ********************************

module.exports = io;
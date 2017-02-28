// This file is executed in the browser, when people visit /chat/<random id>
module.exports = function(io) {
  var express = require('express');
  var session = require('express-session');
  var jwt     = require('jsonwebtoken');
  var router  = express.Router();

  router.all('*', (req, res, next)=>{
      //check if token exists
      var sess = req.session;    
      //if no token redirect to login
      // TODO: check valid token before next()
      if (!sess.token) {
        res.redirect('/users/login');
      } else {
        //if yes call next      
        next();
      }    
  });

  //usernames which are currently connected to the chat
  var usernames={};

  //rooms which are currently available for chat
  var rooms=['lobby','room1','room2'];

  router.get('/', function(req, res, next) {

    var sess = req.session;
    var decodedToken = jwt.verify(sess.token, 'secret');

    // find username on connection    
    io.on('connection', function (socket) {
      // socket.on('send', function() {           
      //   socket.username = decodedToken.username;
      //   //console.log(socket.username);
      // }); 

//code for rooms.  Tracks usernames and rooms

      socket.on('adduser', function(username = decodedToken.username){
        socket.username = username;
        socket.room = 'lobby';
        usernames[username] = username;
        socket.join('lobby');
        socket.emit('updatechat', 'SERVER', 'you have connected to the lobby');
        socket.broadcast.to('lobby').emit('updatechat', 'SERVER', username
         + ' has connected to this room');
        socket.emit('updaterooms', rooms, 'lobby');
      });
      socket.on('switchRoom', function(newroom){
        socket.leave(socket.room);
        socket.join(newroom);
        socket.emit('updatechat', 'SERVER', 'you have connected to ' + newroom);
        socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + 'has left this room');
        socket.room = newroom;
        socket.broadcast.to(newroom).emit('updatechat','SERVER', socket.username + 'has joined this room');
        socket.emit('updaterooms', rooms, newroom);
      });
      socket.on('disconnect', function(){
        delete usernames[socket.username];
        io.socket.emit('updateusers', usernames);
        socket.broadcast.emit('updatechat','SERVER', socket.username 
        + ' has disconnected');
        socket.leave(socket.room);
      });
    });    
    
    res.render('chat');
  });

  return router;
}

/*
var express = require('express');
var session = require('express-session');
var jwt     = require('jsonwebtoken');
var router  = express.Router();
//var io      = require('../models/chat');

router.all('*', (req, res, next)=>{
    //check if token exists
    var sess = req.session;    
    //if no token redirect to login
    // TODO: check valid token before next()
    if (!sess.token) {
      res.redirect('/users/login');
    } else {
      //if yes call next      
      next();
    }    
});

router.get('/', function(req, res, next) {

  var sess = req.session;
  var decodedToken = jwt.verify(sess.token, 'secret');

  
  //connection handler
  io.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
      io.emit('message', { username: decodedToken.username, message: data.message });
    });
  });
  

  res.render('chat');
});
*/
//module.exports = router;
//module.exports = function (io){}
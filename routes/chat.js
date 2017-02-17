// This file is executed in the browser, when people visit /chat/<random id>
var express = require('express');
var session = require('express-session');
var router = express.Router();
var app = express();
var port = 3700;

//router((req, res, next)=>{
    //check if token exists
    //if no token redirect to login
    //if yes call next
//});

router.get('/', function(req, res, next) {
  var sess = req.session;

  var io = require('socket.io').listen(app.listen(port));
  console.log("Listening on port " + port);

  //connection handler
  io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
      io.sockets.emit('message', { username: sess.username, message: data.message });
    });
  });

  res.render('chat');
});



module.exports = router;
//module.exports = function (io){}
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jade = require('jade');

// added ***************************
var session = require('express-session');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project2');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("You're connected to the project 2 db");
});

//chat server
//var express = require("express");
var app = express();
var port = 3700;

// session to store token
app.use(session({
  secret: 'group4',
  resave: false,
  saveUninitialized: false
}));

/*
app.get("/", function(req, res){
    res.send("It works!");
});
*/
/*
var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);
*/
/*
//connection handler
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'Welcome to the chat!' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});
*/
/*
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
*/
/*
var schema = new mongoose.Schema({
  username: String,
  email:  String,
  first_name: String,
  last_name: String,
  password: String,
  messages:  [{ 
    content: { type: String },
    date: { type: Date, default: Date.now }
  }]
});

var User = mongoose.model('users', schema);

User.find(function(err, users)
{
    if(err) return console.error(err);
    console.log(users);
})
*/

// ********************************

var index = require('./routes/index');
var users = require('./routes/users');
var chat = require('./routes/chat');

//var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/chat', chat);

/*
app.all('/', function(req,res){
  res.render('chat');
})
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //console.log(req.body);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//app.post('/users/register', routes.validateForm);
/*
app.post('/users/register', function(req, res) {
  console.log(req.body);
});
*/


module.exports = app;


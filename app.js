var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// tokens
var jwt = require('jsonwebtoken');

// added ***************************
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project2');
var db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("You're connected to the project 2 db");
});
/*
var kittySchema = mongoose.Schema({
  name: String
});

kittySchema.methods.speak = function()
{
  var greeting = this.name
    ? "Meow name is " + this.name
    :"I don't have a name";
    console.log(greeting);
}
var Kitten = mongoose.model('Kitten', kittySchema);

var silence = new Kitten({ name:'Silence'});
console.log(silence.name);
silence.speak();

silence.save(function(err, silence){
  if(err) return console.error(err);
  silence.speak();
});

Kitten.find(function(err, kittens)
{
  if(err) return console.error(err);
  console.log(kittens);
})
*/


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


/*
var brady = new User({ username:'bradyadair', first_name:'James', last_name:'Adair', email:'something@hotmail.com', password:'mypassword'});
console.log(brady.first_name);
*/
/*silence.speak();
*/
/*
brady.save(function(err, brady){
  if(err) return console.error(err);
  console.log(brady.first_name, brady.last_name, brady.email, brady.password);
});
*/
/*
User.remove(function(err, users)
{
    if(err) return console.error(err);

    console.log(users);
})
*/


User.find(function(err, users)
{
  if(err) return console.error(err);

    console.log(users);

})

// ********************************

var index = require('./routes/index');
var users = require('./routes/users');
var chat = require('./routes/chat');

var app = express();

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

app.all('/', function(req,res){
  res.render('chat');
})

app.all('/users/register', function(req,res){
  res.render('users/register');
  console.log(req.body); //body
  var user = new User({ username: req.body.username, 
    first_name: req.body.first_name, 
    last_name: req.body.last_name, 
    email: req.body.email, 
    password: req.body.password});
  
  user.save(function(err, brady){
  if(err) return console.error(err);
    //console.log(user.first_name, user.last_name, user.email, user.password);
  });

  User.find(function(err, users)
  {
    if(err) return console.error(err);

    console.log(users);

  })
});

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


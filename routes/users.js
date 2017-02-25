var express       = require('express');
var session       = require('express-session');
var jwt           = require('jsonwebtoken');
var User          = require('../models/user');
var router        = express.Router();

var myEmail;
var myUsername;

/* GET users listing. */
router.get('/login', function(req, res, next) {
  var passedVariable = req.query.valid;
  console.log(passedVariable);
  /*if (passedVariable == 'invalidLogin')
  {
      res.render('users/login', {loginError: "Invalid Login"});
  }
  else
  {*/
      res.render('users/login');
  //}
});

router.get('/logout', function(req, res, next) {
  var passedVariable = req.query.valid;
  console.log(myEmail);
    User.findOne({
    email: myEmail
  }, function(err, user) {
    if (err) next(err);
    console.log("im out here");
    if (user) {     
          console.log("im in here");   
          var genToken = jwt.sign( {username: myUsername}, 'secret', {
          expiresIn: 1
        });
        console.log(genToken);
        console.log(req.session);  
        console.log(req.session.token);  
        var sess = req.session;
        sess.token = genToken;
        console.log(req.session.token); 

        console.log("my new req.session");
        console.log(req.session); 
    }
  });
  res.render('users/login');
});

router.get('/register', function(req, res, next) {
  var passedVariable = req.query.valid;
  res.render('users/register');
});

//router.post('/login', function(req, res, next) {

router.post('/register', function(req,res){
  
  myPassMatch ='';
  myPassLength='';
  myCpassLength='';
  myUsernameLength='';
  myInvalidUsername='';
  myEmailLength='';
  myInvalidEmail='';
  myFirstnameLength=''; 
  myLastnameLength='';

  var isValid = true;

  console.log(req.body); //body

  var user = new User({ username: req.body.username, 
    first_name: req.body.first_name, 
    last_name: req.body.last_name, 
    email: req.body.email, 
    password: req.body.password});

  
  if (user.password != req.body.cpass)
  {
    myPassMatch = 'Passwords do not match'
    isValid = false;
  }

	
	if((req.body.password.toString()).length <6){//user.password.length() < 6) {
    console.log('bradyadair');
		myPassLength = 'Password cannot be less than 6 characters.';
		isValid = false;
	}

	if((req.body.cpass.toString()).length < 6) {
		myCpassLength= 'Password cannot be less than 6 characters.';
		isValid = false;
	}


	if((user.username.toString()).length == 0) {
		myUsernameLength= 'Username cannot be blank.';
		isValid = false;
	}

	var usernameExp = "^[a-zA-Z0-9_-]*$"; 
	if(user.username.match(usernameExp)) 
	{
	} 
	else {
		myInvalidUsername = 'Username is invalid. Please Try Again. Use only Alphanumeric Characters, _ , and -.';
    isValid = false;
	}

	if((user.email.toString()).length == 0) {
		myEmailLength = 'Email cannot be blank.';

		isValid = false;
	}
	else {	
      var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
      if(user.email.match(emailExp)) {
      } else {
        myInvalidEmail = "Email is invalid. Please Try Again.";
        isValid = false;
      }
	}

	if((user.first_name.toString()).length == 0) {
		myFirstnameLength = "First Name cannot be blank.";
		isValid = false;
	}

	if((user.last_name.toString()).length == 0) {
		myLastnameLength = 'Last Name cannot be blank.';
		isValid = false;
	}

  if(!isValid)
  {
    res.render('users/register', {errors: "Errors:", passMatch: myPassMatch, passLength:myPassLength, cpassLength: myCpassLength,
    usernameLength: myUsernameLength,  invalidUsername: myInvalidUsername, emailLength: myEmailLength,
    invalidEmail: myInvalidEmail, firstnameLength: myFirstnameLength, lastnameLength: myLastnameLength});
  
  }
  else
  {
    res.render('users/login');

    user.save(function(err, brady){
    if(err) return console.error(err);
      //console.log(user.first_name, user.last_name, user.email, user.password);
    });
  }


/*
  User.remove(function(err, users)
  {
      if(err) return console.error(err);

      console.log(users);
  })
  */
/*
  User.find(function(err, users)
  {
    if(err) return console.error(err);

    console.log(users);

  })
  */
});

router.post('/login', function(req, res) {
  // find the user
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) next(err);

    if (!user) {
     // res.json({ success: false, message: 'Authentication failed. User not found'});
      //var string = encodeURIComponent('invalidLogin');
        res.render('users/login', {loginError: "Invalid Login"});
    } else if (user) {
      // check pw
      if (user.password != req.body.password) {
       // res.json({ success: false, message: 'Authentication failed. Wrong password'});
        //var string = encodeURIComponent('invalidLogin');
        res.render('users/login', {loginError: "Invalid Login"});
      } else {
        var genToken = jwt.sign( {username: user.username}, 'secret', {
          expiresIn: "2h"
        });

        var sess = req.session;
        sess.token = genToken;
        myEmail = user.email;
        myUsername = user.username;

        res.redirect('../chat');
      }
    }   
 });
}); 


module.exports = router;

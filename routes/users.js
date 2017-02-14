var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('users/login');
});

router.get('/register', function(req, res, next) {
  res.render('users/register');
});

/*
//app
router.all('/users/login', function(req,res){
  res.render('users/login');
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
*/

module.exports = router;

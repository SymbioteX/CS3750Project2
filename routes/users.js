var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var User = require('../models/user');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('users/login');
});

router.get('/register', function(req, res, next) {
  res.render('users/register');
});

router.post('/login', function(req, res) {
  // find the user
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found'});
    } else if (user) {
      // check pw
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password'});
      } else {
        var token = jwt.sign( {username: user.username}, 'secret', {
          expiresIn: "2h"
        });

        res.json({
          success: true,
          message: 'Enjoy your token',
          token: token
        });
      }
    }   
 });
}); 


module.exports = router;

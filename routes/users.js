var express       = require('express');
var session       = require('express-session');
var jwt           = require('jsonwebtoken');
var User          = require('../models/user');
var router        = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('users/login');
});

router.get('/register', function(req, res, next) {
  res.render('users/register');
});

router.post('/login', function(req, res, next) {
  // find the user
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) next(err);

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found'});
    } else if (user) {
      // check pw
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password'});
      } else {
        var genToken = jwt.sign( {username: user.username}, 'secret', {
          expiresIn: "2h"
        });

        var sess = req.session;
        sess.token = genToken;
        sess.username = user.username;

        res.redirect('../chat');              
      }
    }   
 });
}); 


module.exports = router;

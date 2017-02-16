// This file is executed in the browser, when people visit /chat/<random id>
var express = require('express');
var router = express.Router();

//router((req, res, next)=>{
    //check if token exists
    //if no token redirect to login
    //if yes call next
//});

router.get('/', function(req, res, next) {
  res.render('chat');
});



module.exports = router;
//module.exports = function (io){}


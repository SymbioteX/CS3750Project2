// This file is executed in the browser, when people visit /chat/<random id>
var express = require('express');
var router = express.Router();


router.get('/', function(req,res){

		// Render the chat.jade view
		res.render('chat');
	});

module.exports = router;
//module.exports = function (io){}


/*
    Routing of the app. 
    Just do routing
*/

var express = require('express');
var router = express.Router();
var redis = require("../server/redis");

/* GET home page. */
router.get('/', function(req, res) {
    // is banned ip?
    var ip = req.connection.remoteAddress;
    redis.sismember("banned_ip", ip, function(err, result){
        if(err) {
            console.log(err);
            return false;
        }
        if(result == 1) {
            res.send("you are banned!");
        } else {
            res.render('index');    // Kick off `app/index.jade` rendering
        }
    });
});

module.exports = router;

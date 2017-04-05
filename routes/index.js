var express = require('express');
var router = express.Router();
var mongoose = require('libs/mongoose');
var async = require('async');

var User = require('models/user').User;
var db = mongoose.connection;

//test
router.get('/', function (req, res, next) {
    res.send("SERVER WORKING!");
});

//Load progress or new user registration
router.post('/api/download/:id', function (req, res) {
    var id = req.params.id
    var userprogress = req.body.userclass;
    console.log("JSON from client " + userprogress + "\n");

    var jsonContent = JSON.parse(userprogress); // Парсинг JSON полученного от клиента
    console.log("Username: " + id + "\n");

    async.waterfall([
        function (callback) {
            User.findById({_id: id }, callback);
        },
        function (user, callback) {
            if (user){
                console.log("User founded!");
                callback(null, user);
            }
            else {
                console.log("User not found!");
                var user = new User({_id: id
                    , playerName: jsonContent.playerName
                    , level: jsonContent.level
                    , expirience: jsonContent.expirience
                    , mass: jsonContent.mass
                });
                user.save(function (err)
                {
                    if (err) {
                        res.send(500);
                    }
                    else {
                        console.log("New user was save");
                        res.send(200);
                    }
                    //callback(null, user);
                });
            }
        }
    ], function (err, user) {
        if (err) {
            res.send(500);
        }
        else {
            var _timeSpan = Date.now() - user.closetime;
            User.findByIdAndUpdate(id, {$set:  {timeSpan: _timeSpan}}, {new: true}, function (err, user) {
                res.json(user);
                res.send(200);
                console.log("UPDATED");
            });
        }
    });
});
//save user progress
router.post('/api/save/:id', function (req, res) {
    var id = req.params.id;
    var userprogress = req.body.userclass;
    console.log("JSON from client " + userprogress + "\n");

    var jsonContent = JSON.parse(userprogress); // Парсинг JSON полученного от клиента

    User.findByIdAndUpdate(id, {$set:{playerName: jsonContent.playerName
            ,level: jsonContent.level
            ,expirience: jsonContent.expirience
            ,mass: jsonContent.mass}}
        ,{new: true}, function (err, user) {
                if (err) {
                    res.send(500);
                }
                else {
                    console.log("UPDATED");
                    res.send(200);
                }
        });
});
//save user progress on close application
router.post('/api/close/:id', function (req, res) {
    var id = req.params.id;
    var userprogress = req.body.userclass;
    console.log("JSON from client " + userprogress + "\n");

    var jsonContent = JSON.parse(userprogress); // Парсинг JSON полученного от клиента

    User.findByIdAndUpdate(id, {$set:{playerName: jsonContent.playerName
            ,level: jsonContent.level
            ,expirience: jsonContent.expirience
            ,mass: jsonContent.mass
            ,closetime: Date.now()}}
        ,{new: true}, function (err, user) {
            if (err) {
                res.send(500);
            }
            else {
                console.log("UPDATED");
                res.send(200);
            }
        });
});

router.post('/api/update/:id', function (req, res) {
    console.log(req.body);

});
module.exports = router;
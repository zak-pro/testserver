var config = require('config');

var path = require('path');
var async = require('async');
var User = require('models/user.js').User;

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('routes/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', process.env.PORT || config.get('port'));

app.get('/', function (req, res) {
    res.json({
    Test: 'OK!'
    })
});
/*
app.post('/api/close/:id', function (req, res, next) {

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
            if (err) return next(err);
            console.log("UPDATED");
        });
});

app.post('/api/save/:id', function (req, res, next) {
    var id = req.params.id;
    var userprogress = req.body.userclass;
    console.log("JSON from client " + userprogress + "\n");

    var jsonContent = JSON.parse(userprogress); // Парсинг JSON полученного от клиента

    User.findByIdAndUpdate(id, {$set:{playerName: jsonContent.playerName
            ,level: jsonContent.level
            ,expirience: jsonContent.expirience
            ,mass: jsonContent.mass}}
        ,{new: true}, function (err, user) {
            if (err) return next(err);
            console.log("UPDATED");
        });
});
*/

app.use(router);

app.post('/close', function(req, res){
    console.log("Запрос поступил");
    res.json({
        Залупа: 'ПИРОРАС!!!'
    })
})

app.post('/api/download/:id', function (req, res) {

    var id = req.params.id;
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
                    if (err) return next(err);
                    console.log("New user was save");
                    //callback(null, user);
                });
            }
        }
    ], function (err, user) {
        if (err) return next(err);
        var _timeSpan = Date.now() - user.closetime;
        User.findByIdAndUpdate(id, {$set:  {timeSpan: _timeSpan}}, {new: true}, function (err, user) {
            res.json(user);
            console.log("UPDATED");
        });

    });
});


var server = app.listen(app.get('port'), function () {
    console.log("Server is running on port: " + app.get('port'));
});

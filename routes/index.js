var express = require('express');
var router = express.Router();
var mongoose = require('libs/mongoose');
var async = require('async');

var User = require('models/user').User;
var db = mongoose.connection;


router.get('/', function (req, res, err) {
    res.writeHead(200, {'Contetnt-Tupe': 'text/plain'});
    res.end("Zalupa zarabotal");
});

router.post('/api/close/:id', function (req, res, next) {

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

router.post('/api/save/:id', function (req, res, next) {
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


module.exports = router;
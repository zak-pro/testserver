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

//Загрузка прогресса,Если юзера нет, регистрируем нового
router.post('/test',function(req,res,next) {
    res.json({Hello: "Zalupa"});
});
router.post('/api/download/:id', function (req, res, next) {

    var id = req.params.id;
    var userprogress = req.body.userclass;
    console.log("JSON from client " + userprogress + "\n");

    var jsonContent = JSON.parse(userprogress); // Парсинг JSON полученного от клиента
    console.log("Имя пользователя: " + id + "\n");

    async.waterfall([
        function (callback) {
            User.findById({_id: id }, callback);
        },
        function (user, callback) {
            if (user){
                console.log("ПОЛЬЗОВАТЕЛЬ НАЙДЕН!");
                callback(null, user);
            }
            else {
                console.log("ПОЛЬЗОВАТЕЛЬ НЕ НАЙДЕН!");
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

//Сохранение прогресса при закрытии приложения
router.post('/close/:id', function (req, res, next) {

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

router.post('/save/:id', function (req, res, next) {
    var id = req.params.id;
    var userprogress = req.body.userclass;

    console.log("JSON from client " + userprogress + "\n");

    var jsonContent = JSON.parse(userprogress); // Парсинг JSON полученного от клиента
    User.findByIdAndUpdate(id, {$set:{playerName: jsonContent.playerName
            ,level: jsonContent.level
            ,expirience: jsonContent.expirience
            ,mass: jsonContent.mass }}
        ,{new: true}, function (err, user) {
            if (err) return next(err);
            console.log("UPDATED");
        });
});
module.exports = router;
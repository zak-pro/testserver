
var express = require('express');   //define express
var app = express();                //define app with express
var path = require('path');         //define path
var bodyParser = require('body-parser');
var async = require('async');
//var User = require('user').User;




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', process.env.PORT || 8080);

app.get('/', function (req, res) {
    res.json({
        Витек: 'ПИРОРАС!!!'
        /* playerName: 'String',
         level: 'String',
         expirience: 'String',
         mass: 'Array',
         timeSpan: 'String'*/
    })
});

app.post('/close', function(req, res){
    console.log("Запрос поступил");
    res.json({
        Витек: 'ПИРОРАС!!!'
    })
})

app.post('/api/download/:id', function (req, res) {

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




var server = app.listen(app.get('port'), function () {
    console.log("Server is running on port: " + app.get('port'));
});

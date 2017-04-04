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

app.use(router);


app.use(function (err, req, res, next) {
    console.log(err.name);
    if (err.name == "ValidationError") {
        res.send(400, err);
    } else {
        next(err);
    }
});

// Если же произошла иная ошибка то отдаем 500 Internal Server Error
app.use(function (err, req, res, next) {
    res.send(500, err);
});


var server = app.listen(app.get('port'), function () {
    console.log("Server is running on port: " + app.get('port'));
});


var express = require('express');   //define express
var app = express();                //define app with express
var path = require('path');         //define path


app.get('/', function (req, res) {
    res.json({
        Витек: 'ПИРОРАС!!!',
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



app.set('port', process.env.PORT || 8080);


var server = app.listen(app.get('port'), function () {
    console.log("Server is running on port: " + app.get('port'));
});

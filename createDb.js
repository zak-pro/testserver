var mongoose = require('libs/mongoose');
mongoose.set('debug', true);
var async = require('async');


async.series([      //последовательный асинхронный вызов функций
        open,
        dropDatabase,
        requireModels,
        // createUsers
    ],
    function (err) {
        mongoose.disconnect();
        console.log(arguments);
    });

function open (callback) {
    mongoose.connection.on('open', callback);
    console.log("open+")
}

function dropDatabase(callback){
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
    console.log("drop+")
}

/*function createUsers(callback) {
 async.parallel([
 function(callback) {
 var dimon = new User({username: 'Димон', userprogress: '{"Поле 1": "Значение 1"}'});
 dimon.save(function(err){
 callback(err, dimon);
 });
 },
 function(callback) {
 var serega = new User({username: 'Серега', userprogress: '{"Поле 1": "Значение 1"}'});
 serega.save(function(err){
 callback(err, serega);
 });
 }
 ], callback);
 console.log("careate +");
 }*/

function requireModels(callback){
    require('models/user').User;

    async.each(Object.keys(mongoose.models), function (modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUsers(callback) {

    /* var users = [
     {_id: 'g1527572596845953528',  },
     {_id: 'g1414595759747422738',  }
     ];
     */
    //  async.each(users, function (userData, callback) {
    //var user = new mongoose.models.User(userData);
    // user.save(callback);
    //}, callback);
    //  console.log(users);
}
var mongoose = require('./../libs/mongoose');

var Schema = mongoose.Schema;


//Схема пользователя, описывающая документ в БД с игровым прогрессом

var schema = new Schema({
    _id: {
        type: String,
        required: true
    },

    playerName: String,

    level: String,

    expirience: String,

    mass: Array,

    timeSpan: String,

    closetime:{
        type: Date,
        default : Date.now
    },

    created:{
        type: Date,
        default : Date.now
    }
});

exports.User = mongoose.model('User', schema);
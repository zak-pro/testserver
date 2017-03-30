var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/test", {
    "server": {
        "socketOptions": {
            "keepAlive": 1
        }
    }
});

module.exports = mongoose;
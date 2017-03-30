var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://medata:SeHSXkSkeJdq6GjZQpoxSLE0uXZ4gBzGxP8i1tGbBJeoyQ710JvZSsW2jAuG4IRs2rIgITRTZFJ2BxsVxpexPA==@medata.documents.azure.com:10250/?ssl=true", {
    "server": {
        "socketOptions": {
            "keepAlive": 1
        }
    }
});

module.exports = mongoose;
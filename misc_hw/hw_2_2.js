var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/m101', function (err, db) {
    var state = "";
    var result = [];
    var cursor = db.collection('weather_data').find();

    function markAsMonthHigh(id) {
        "use strict";
        MongoClient.connect('mongodb://localhost:27017/m101', function (err, db) {
            db.collection("weather_data").findAndModify({"_id": id}, [], {$set: {"month_high": true}}, {"new": true}, function (err, doc) {
                if (err) throw err;
                db.close();
            });
        });
    }

    cursor.sort([
        ["State", 1],
        ["Temperature", -1]
    ]);

    cursor.each(function (err, doc) {
        if (err) {
            throw err;
        }

        if (doc === null) {
            console.log(result);
            db.close();
        }
        else if (state !== doc.State) {
            markAsMonthHigh(doc["_id"]);
            result.push(doc);
            state = doc.State;
        }
    });
});


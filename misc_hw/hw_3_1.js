var MongoClient = require('mongodb').MongoClient;
var MongoClient2 = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function (err, db) {

    if(err) throw err;
    var cursor = db.collection('students').find();

    cursor.each(function (err, doc) {

        if (err) {
            throw err;
        }

        if (doc === null) {
            console.log("end");
        }
        else{

            var scores = doc.scores;
            var lowest_hw = null;
            for (var i = 0; i < scores.length; ++i) {
                if (scores[i].type === "homework") {
                    if (lowest_hw === null) {
                        lowest_hw = scores[i];
                    }
                    else if (scores[i].score < lowest_hw.score) {
                        lowest_hw = scores[i];
                    }
                }
            }

            if(lowest_hw !== null){
                db.collection("students").findAndModify({"_id": doc._id}, [], {$pull: {"scores": lowest_hw}}, {"new": true}, function (err, doc) {
                    if (err) throw err;
                    console.log("new doc");
                    console.log(doc);
                    console.log("done");
                });
            }
        }
    });
});


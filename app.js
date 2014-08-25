var express = require('express');
var app = express(); // Web framework to handle routing requests
var cons = require('consolidate'); // Templating library adapter for Express
var MongoClient = require('mongodb').MongoClient; // Driver for connecting to MongoDB
var routes = require('./routes'); // Routes for our application
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

MongoClient.connect('mongodb://localhost:27017/blog', function(err, db) {
    "use strict";
    if(err) throw err;

    // Register our templating engine
    app.engine('html', cons.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');

    // Express middleware to populate 'req.cookies' so we can access cookies
    app.use(cookieParser());

    // Express middleware to populate 'req.body' so we can access POST variables
    app.use(bodyParser.urlencoded({
        extended: true
    }));
//    app.use(bodyParser.json());

    // Application routes
    routes(app, db);

    app.listen(3000);
    console.log('Express server listening on port 3000');
});

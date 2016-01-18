/**
 *
 *  TODO: This file is very similar across projects. Look into putting it into a reusable class or something.
 *
 * This script starts up a web server to serve the application and also proxy
 * calls to the ReST API.
 *
 * Also, for the server to start up and servce content you have to have built
 * the project (i.e. gulp).
 */
var express = require('express');
var request = require('request');
var app = express();

var apiUrl = "http://localhost:8081";

/*
 * Static content.
 */
app.use('/ourcrisis', express.static('build/webroot'));

/*
 * Redirect / to /ourcrisis
 */
app.get('/', function(req, res) {
    res.redirect('/ourcrisis');
});

/*
 * Start the server.
 */
var server = app.listen(3000, "localhost", function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
});
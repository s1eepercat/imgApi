"use strict";
// const requests = require('./requests');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('public'));
app.listen(port, function () { console.log("Server is on, port " + port + "."); });
app.get('/', function (req, res) {
    res.status(200).json({ ass: 'ass' });
});
// var express = require('express')
// var path = require('path')
// var serveStatic = require('serve-static')
// var app = express()
// app.use(serveStatic(path.join(__dirname, 'dist')))
// var port = process.env.PORT || 8000
// app.listen(port)
// console.log('server started ' + port)

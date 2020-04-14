"use strict";
// const requests = require('./requests');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var port = process.env.POST || 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('public'));
app.listen(3000, function () { console.log("Server is on, port " + port + "."); });
app.get('/', function (req, res) {
    res.status(200).json({ ass: 'ass' });
});

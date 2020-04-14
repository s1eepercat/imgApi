"use strict";
var requests = require('./requests');
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
app.get('/gallery', function (req, res) {
    if (req.query.id) {
        var search_1 = requests.search(req.query.id);
        search_1 ? res.status(200).json(search_1) : res.status(404).json('No entry found');
    }
    else {
    }
});

const requests = require('./requests');
const errorHandler = require('./_helpers/errors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('public'));
app.use(requests);
app.use(errorHandler);
app.listen(port, function () { console.log("Server is on, port " + port + "."); });
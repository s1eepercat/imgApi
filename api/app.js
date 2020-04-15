const authentication = require('./authentication');
const errorHandler = require('./_helpers/errors');
const jwt = require('./_helpers/jwt');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('public'));
app.use(jwt());
app.use('/login', authentication);
app.use(errorHandler);
app.listen(port, function () { console.log("Server is on, port " + port + "."); });
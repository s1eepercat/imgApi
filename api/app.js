const errors = require('./middleware/errors');
const loginRoute = require('./routes/login.route');
const collectionRoute = require('./routes/collection.route');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

!fs.existsSync(__dirname + '/data/collection.json') && fs.writeFile(__dirname + '/data/collection.json', '{}', () => { });

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('public'));
app.use('/api/login', loginRoute);
app.use('/api/collection', collectionRoute);
app.all('*', (req, res, next) => next(errors.newError('Page not found / Bad Request', 404)));
app.use(errors.handleErrors);

app.listen(port, function () { console.log("Server is on, port " + port + "."); });
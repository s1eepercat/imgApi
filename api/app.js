const errors = require('./middleware/errors');
const loginRoute = require('./routes/login.route');
const collectionRoute = require('./routes/collection.route');
const imageRoute = require('./routes/image.route');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dm = require('./data/data.manipulations');
const app = express();
const port = process.env.PORT || 3000;

dm.createDataFiles(__dirname);
dm.cleanImages(__dirname, 'collection');
dm.cleanImages(__dirname, 'image');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('public'));
app.use('/api/login', loginRoute);
app.use('/api/collection', collectionRoute);
app.use('/api/image', imageRoute);
app.all('*', (req, res, next) => next(errors.newError('Page not found / Bad Request', 404)));
app.use(errors.handleErrors);

app.listen(port, function () { console.log("Server is on, port " + port + "."); });
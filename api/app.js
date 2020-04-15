const authenticate = require('./authentication');
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
app.use('/images', authenticate);
app.use(errorHandler);
app.listen(port, function () { console.log("Server is on, port " + port + "."); });



// app.get('/test', function (req, res) {
//     res.status(200).json({ test: 'test' });
// });




// const express = require('express')
// const path = require('path')
// const serveStatic = require('serve-static')
// const app = express()
// app.use(serveStatic(path.join(__dirname, 'dist')))
// const port = process.env.PORT || 8000
// app.listen(port)
// console.log('server started ' + port)


// app.get('/photos', (req: any, res: any) => {
//     if (req.query.id) {
//         console.log(req.query.id)
//     } else {
//         res.status(200).json({ test: 'test' })
//     }
// });

// const expressJwt = require('express-jwt');
// const config = require('config.json');

// module.exports = jwt;

// function jwt() {
//     const { secret } = config;
//     return expressJwt({ secret }).unless({
//         path: [
//             // public routes that don't require authentication
//             '/users/authenticate'
//         ]
//     });
// }
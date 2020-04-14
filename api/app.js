const requests = require('./requests');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('public'));

app.listen(port, function () { console.log("Server is on, port " + port + "."); });

app.get('/test', function (req, res) {
    res.status(200).json({ test: 'test' });
});
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
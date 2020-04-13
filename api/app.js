const requests = require('./requests');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.POST || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('public'));
app.listen(3000, () => { console.log(`Server is on, port ${port}.`) });

app.get('/gallery', (req, res) => {
    if (req.query.id) {
        const search = requests.search(req.query.id);
        search ? res.status(200).json(search) : res.status(404).json('No entry found');
    } else {

    }
});
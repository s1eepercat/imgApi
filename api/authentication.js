const jwt = require('jsonwebtoken');
const config = require('../config.json');
const express = require('express');
const router = express.Router();

// admin routes
router.post('/', login);

function login(req, res, next) {
    authenticate(req.body)
        .then(token => token ? res.json(token) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

async function authenticate({ username, password }) {
    const isLoggedIn = (username === 'test' && password === 'test');
    if (isLoggedIn) {
        const token = jwt.sign('admin_aleksej', config.secret);
        return {
            token
        };
    }
}

module.exports = router;





// const data = require('./data.js');

// const search = (id) => {
//     itemArr.find(object => object.id === Number(id))
// };

// module.exports = {
//     search: search,
// }

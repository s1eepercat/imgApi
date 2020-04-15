const jwt = require('jsonwebtoken');
const config = require('../config.json');
const express = require('express');
const router = express.Router();
let accessToken;
const adminUsername = 'test';
const adminPassword = 'test';

// admin routes
// router.get('/',) ??? redirect to login

router.post('/', login);

// router.get('/images', ) imagery manipulation

function login(req, res, next) {
    authenticate(req.body)
        .then(token => token ? res.json(token) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

async function authenticate({ username, password }) {
    if (username === adminUsername && password === adminPassword) {
        accessToken = jwt.sign('admin_aleksej', config.secret);
        return {
            accessToken
        };
    }
}

module.exports = router;
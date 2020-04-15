const jwt = require('jsonwebtoken');
const config = require('./../../config.json');
const adminUsername = 'test';
const adminPassword = 'test';
let access_token;

const login = (req, res, next) => {
    authenticate(req.body)
        .then(token => token ? res.json(token) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

const authenticate = async ({ username, password }) => {
    if (username === adminUsername && password === adminPassword) {
        access_token = jwt.sign('admin_aleksej', config.secret);
        return { access_token }
    }
}

const validateToken = (token) => token === access_token;

module.exports = {
    login: login,
    validateToken: validateToken
}
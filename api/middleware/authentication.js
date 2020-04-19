const jwt = require('jsonwebtoken');
const config = require('../../config.json');
const errors = require('./errors')
const adminUsername = 'test';
const adminPassword = 'test';
let access_token;

const authenticate = async ({ username, password }) => {
    if (username === adminUsername && password === adminPassword) {
        access_token = jwt.sign('admin_aleksej', config.secret);
        return { access_token }
    }
}

const login = (req, res, next) => {
    authenticate(req.body)
        .then(token => {
            token ? res.status(200).json(token) : next(errors.newError('Username or password is incorrect / Bad Request', 400));
        })
}

const validateToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (token) {
        try {
            jwt.verify(token, config.secret);
            next();
        } catch (error) {
            next(errors.newError('Invalid token / Unauthorized', 401));
        }
    } else {
        next(errors.newError('Access denied. No token provided / Unauthorized', 401));
    }
};

module.exports = {
    login: login,
    validateToken: validateToken
}
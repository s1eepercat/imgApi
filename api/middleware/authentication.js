const jwt = require('jsonwebtoken');
const config = require('../../config.json');
const errors = require('./errors')
let signature = 'aleksejs_web';
let jwtExpirySeconds = '3600';
const adminUsername = 'test';
const adminPassword = 'test';

const authenticate = async ({ username, password }) => {
    if (username === adminUsername && password === adminPassword) {
        const token = jwt.sign({ signature }, config.secret, {
            algorithm: 'HS256',
            expiresIn: jwtExpirySeconds
        });
        return { token }
    }
}

const login = (req, res, next) => {
    authenticate(req.body)
        .then(token => {
            if (token) {
                res.status(200).cookie('x-access-token', token.token, { path: '/', maxAge: jwtExpirySeconds * 1000, httpOnly: true }).end();
            } else {
                next(errors.newError('Username or password is incorrect / Bad Request', 400))
            }
        })
}

const validateToken = (req, res, next) => {
    const token = req.cookies['x-access-token'];
    if (token) {
        try {
            jwt.verify(token, config.secret, { algorithms: ['HS256'], expiresIn: [jwtExpirySeconds] });
            next();
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                next(errors.newError('Invalid token / Unauthorized', 401));
            } else {
                next(errors.newError(error, 500));
            }
        }
    } else {
        next(errors.newError('Access denied. No token provided / Unauthorized', 401));
    }
};

module.exports = {
    login: login,
    validateToken: validateToken
}
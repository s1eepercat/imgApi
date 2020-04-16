const jwt = require('jsonwebtoken');
const config = require('../../config.json');
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
        .then(token => token ? res.json(token) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

const validateToken = function (req, res, next) {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        const decoded = jwt.verify(token, config.secret);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send("Invalid token.");
    }
};

module.exports = {
    login: login,
    validateToken: validateToken
}
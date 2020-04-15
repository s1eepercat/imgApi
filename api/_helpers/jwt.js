const expressJwt = require('express-jwt');
const config = require('./../../config.json');

module.exports = jwt;

function jwt() {
    const { secret } = config;
    return expressJwt({ secret }).unless({
        path: [
            '/',
            '/login.html',
            '/admin.html',

            '/login' //api calls
        ]
    });
}
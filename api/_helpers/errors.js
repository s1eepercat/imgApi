module.exports = errorHandler;

//MAKE NOT FOUND PAGE


function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });

        // REDIRECT HERE TO PAGE NOT FOUND????
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
}
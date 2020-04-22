const newError = (message, status) => {
    let err = new Error(message);
    err.statusCode = status;
    return err;
}

const handleErrors = (err, req, res, next) => {
    if (!err.statusCode) err.statusCode = 500;
    console.error(`Error: ${err.message}, status: ${err.statusCode}`);
    res.status(err.statusCode).json(err.message);
};

module.exports = {
    handleErrors: handleErrors,
    newError: newError
}
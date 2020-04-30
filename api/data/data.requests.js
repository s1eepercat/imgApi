const fs = require('fs');
const errors = require('../middleware/errors');

const getImages = async (file, id = undefined) => {
    return readFile(file)
        .then(collection => id ? { [id]: collection[id] } : collection);
}

const postImages = async (file, id, path) => {
    return readFile(file)
        .then(collection => {
            collection[id] = path;
            writeFile(file, collection);
            return collection;
        });
}

const putImages = async (file, id, path) => {
    return readFile(file)
        .then(collection => {
            const lastPath = collection[id];
            collection[id] = path;
            writeFile(file, collection);
            deleteImage('./public' + lastPath);
            return collection;
        });
}

const deleteImages = async (file, id) => {
    return readFile(file)
        .then(collection => {
            const lastPath = collection[id];
            delete collection[id];
            writeFile(file, collection);
            deleteImage('./public' + lastPath);
            return collection;
        });
}

const readFile = async (file) => {
    let promise = new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject(errors.newError('Reading failed / Internal Server Error', 500));
            } else {
                resolve(JSON.parse(data));
            }
        })
    })
    return await promise;
}

const writeFile = (file, data) => {
    fs.writeFile(file, JSON.stringify(data), (err) => errors.newError('Writing failed / Internal Server Error', 500));
}

const deleteImage = (path) => {
    fs.unlink(path, (err) => errors.newError('Deleting failed / Internal Server Error', 500));
}

module.exports = { getImages, postImages, putImages, deleteImages };
const fs = require('fs');
const errors = require('../middleware/errors');

const getImages = async (file, id = undefined) => {
    let promise = new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject(errors.newError('Reading failed / Internal Server Error', 500));
            collection = JSON.parse(data);
            if (id) {
                resolve({ [id]: collection[id] });
            } else {
                pathsArray = [];
                for (let id in collection) {
                    collection[id];
                    pathsArray.push(collection[id]);
                }
                resolve(pathsArray);
            }
        });
    });
    return await promise;
}

const postImages = async (file, id, path) => {
    let promise = new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject(errors.newError('Reading failed / Internal Server Error', 500));
            collection = JSON.parse(data);
            collection[id] = path;
            fs.writeFile(file, JSON.stringify(collection), (err) => {
                if (err) reject(errors.newError('Writing failed / Internal Server Error', 500));
            });
            resolve(collection);
        });
    })
    return await promise;
}

const putImages = async (file, id, path) => {
    let promise = new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject(errors.newError('Reading failed / Internal Server Error', 500));
            collection = JSON.parse(data);
            const lastPath = collection[id];
            collection[id] = path;
            fs.writeFile(file, JSON.stringify(collection), (err) => {
                if (err) reject(errors.newError('Writing failed / Internal Server Error', 500));
            });
            fs.unlink('./public' + lastPath, (err) => {
                if (err) reject(errors.newError('Deleting failed / Internal Server Error', 500));
            })
            resolve(collection);
        });
    });
    return await promise;
}

const deleteImages = async (file, id) => {
    let promise = new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject(errors.newError('Reading failed / Internal Server Error', 500));
            collection = JSON.parse(data);
            const lastPath = collection[id];
            delete collection[id];
            fs.writeFile(file, JSON.stringify(collection), (err) => {
                if (err) reject(errors.newError('Writing failed / Internal Server Error', 500));
            });
            fs.unlink('./public' + lastPath, (err) => {
                if (err) reject(errors.newError('Deleting failed / Internal Server Error', 500));
            })
            resolve(collection);
        });
    });
    return await promise;
}

module.exports = { getImages, postImages, putImages, deleteImages };
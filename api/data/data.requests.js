const fs = require('fs');
const errors = require('../middleware/errors');
const dataCache = require('./data.cache');
let COLLECTION = dataCache.cacheCollection();
let IMAGE = dataCache.cacheImage();

async function getImages(file, id = null) {
    let promise = new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject(errors.newError('Something went wrong / Internal Server Error', 500));
            collection = JSON.parse(data);
            if (id) {
                resolve(collection[id]);
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

async function postImages(file, id, path) {
    let promise = new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject(errors.newError('Something went wrong / Internal Server Error', 500));
            collection = JSON.parse(data);
            collection[id] = path;
            fs.writeFile(file, JSON.stringify(collection), (err) => {
                if (err) reject(errors.newError('Something went wrong / Internal Server Error', 500));
            });
            resolve(collection);
        });
    })
    return await promise;
}

module.exports = { getImages, postImages };
const fs = require('fs');

const cacheCollection = async () => {
    let promise = new Promise((resolve, reject) => {
        fs.readFile('./api/data/collection.json', (err, data) => {
            if (err) reject(err);
            resolve(JSON.parse(data));
        });
    });
    return await promise;
};

const cacheImage = async () => {
    let promise = new Promise((resolve, reject) => {
        fs.readFile('./api/data/image.json', (err, data) => {
            if (err) reject(err);
            resolve(JSON.parse(data));
        });
    });
    return await promise;
};


module.exports = { cacheCollection, cacheImage }
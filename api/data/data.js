const fs = require('fs');
const errors = require('./../middleware/errors')

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
            collection[id] = path; //VALIDATE JSON, IF EXISTS AND NOT EMPTY
            fs.writeFile(file, JSON.stringify(collection), (err) => {
                if (err) reject(errors.newError('Something went wrong / Internal Server Error', 500));
                console.log('Data written to file');
            });
            resolve(collection);

        });
    })
    return await promise;
}

// async function updateImages(file, id, )

//Delete

// async function readJson(file) {
//     let promise = new Promise((resolve, reject) => {

//         fs.readFile(file, (err, data) => {
//             if (err) reject(new Error('ass'));
//             collection = JSON.parse(data);
//             resolve(collection);
//         });
//     })

//     return await promise;
// }




// const writeData = (i) => {
//     let data = JSON.stringify(i, null, 2);

//     fs.writeFile('./api/data/collection.json', data, (err) => {
//         if (err) throw err;
//         console.log('Data written to file');
//     });
// }



module.exports = {
    getImages: getImages,
    postImages: postImages,
    // readJson: readJson
};
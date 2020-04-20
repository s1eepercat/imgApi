const fs = require('fs');
const errors = require('./../middleware/errors')

async function getImages(file, id = null) {
    let promise = new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject(errors.newError('Something went wrong / Internal Server Error', 500));
            collection = JSON.parse(data);
            if (id) {
                resolve(collection[id].path);
            } else {
                pathsArray = [];
                for (let [key, value] of Object.entries(collection)) {
                    if (value.path) {
                        pathsArray.push(value.path);
                    }
                }
                resolve(pathsArray);
            }
        });
    });
    return await promise;
}

async function postImages(file, id, name, path) {
    let promise = new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject(errors.newError('Something went wrong / Internal Server Error', 500));
            collection = JSON.parse(data);
            let item = {
                id: id,
                name: name,
                path: path
            }
            collection[id] = item;
            collection.count++;
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
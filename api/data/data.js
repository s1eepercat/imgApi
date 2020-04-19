const fs = require('fs');
const errors = require('./../middleware/errors')

//Get
async function getImages(file, id = null) { //MAKE IF NOT NULL
    let promise = new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject(errors.newError('Something went wrong / Internal Server Error', 500));
            collection = JSON.parse(data);
            id ? resolve(collection[id]) : resolve(collection);
        });
    })
    return await promise;
}

//Post
async function updateJson(file, name, path) {
    let promise = new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject(errors.newError('Something went wrong / Internal Server Error', 500));
            col = JSON.parse(data);
            let count = Number(col.count);
            let item = {
                id: count + 1,
                name: name,
                path: path
            }
            col[count + 1] = item;
            col.count++;
            fs.writeFile(file, JSON.stringify(col), (err) => {
                if (err) reject(errors.newError('Something went wrong / Internal Server Error', 500));
                console.log('Data written to file');
            });
            resolve(col);
        });
    })
    return await promise;
}

//Update

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
    updateJson: updateJson,
    // readJson: readJson
};
const fs = require('fs');
const errors = require('../middleware/errors');

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

// const cleanImages = (path, dirName, next) => {
//     readFile(`${path}/data/${dirName}.json`)
//         .then(images => {
//             fs.readdir(`${path}/../public/${dirName}`, (err, files) => {
//                 if (err) errors.newError(err, 500);
//                 files.forEach((file) => {
//                     let foundMatch = false;
//                     for (key in images) {
//                         if (images[key] === `/${dirName}/` + file) {
//                             foundMatch = true;
//                         }
//                     }
//                     if (foundMatch === false) {
//                         deleteImage(`${path}/../public/${dirName}/${file}`);
//                     }
//                 });
//             });
//         })
//         .catch(err => (console.log(err)));
// }

// dm.cleanImages(__dirname, 'collection');
// dm.cleanImages(__dirname, 'image');

const createDataFiles = (dir) => {
    !fs.existsSync(dir + '/data/collection.json') && fs.writeFile(dir + '/data/collection.json', '{}', () => { });
    !fs.existsSync(dir + '/data/image.json') && fs.writeFile(dir + '/data/image.json', '{}', () => { });
    !fs.existsSync(dir + '/../public/collection') && fs.mkdirSync(dir + '/../public/collection');
    !fs.existsSync(dir + '/../public/image') && fs.mkdirSync(dir + '/../public/image');
}


module.exports = { readFile, writeFile, deleteImage, createDataFiles };
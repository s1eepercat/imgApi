const dm = require('./data.manipulations');

const getImages = async (file, id = undefined) => {
    return dm.readFile(file)
        .then(collection => id ? { [id]: collection[id] } : collection);
}

const postImages = async (file, id, path) => {
    return dm.readFile(file)
        .then(collection => {
            collection[id] = path;
            dm.writeFile(file, collection);
            return collection;
        });
}

const putImages = async (file, id, path) => {
    return dm.readFile(file)
        .then(collection => {
            const existingImage = collection[id];
            collection[id] = path;
            dm.writeFile(file, collection);
            dm.deleteImage('./public' + existingImage);
            return collection;
        });
}

const deleteImages = async (file, id) => {
    return dm.readFile(file)
        .then(collection => {
            const existingImage = collection[id];
            delete collection[id];
            dm.writeFile(file, collection);
            dm.deleteImage('./public' + existingImage);
            return collection;
        });
}

module.exports = { getImages, postImages, putImages, deleteImages };
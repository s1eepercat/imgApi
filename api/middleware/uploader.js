const path = require('path');
const multer = require('multer');

const storage = (dir) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, `./../../public/${dir}`))
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    })
}

const uploader = (dir) => multer({ storage: storage(dir) })

module.exports = uploader;
const path = require('path');
const multer = require('multer');
const errors = require('./errors');

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

const uploader = (dir) => multer({
    storage: storage(dir),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(errors.newError('Only png, jpg and jpeg formats are allowed. / Bad Request', 400));
        }
    }
})

module.exports = uploader;
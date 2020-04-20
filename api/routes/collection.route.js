const auth = require('./../middleware/authentication');
const express = require('express');
const errors = require('./../middleware/errors');
const router = express.Router();
const data = require('./../data/data');
const path = require('path');
const multer = require('multer');

router.get('/', (req, res, next) => {
    data.getImages('./api/data/collection.json')
        .catch(err => next(err))
        .then(data => res.status(200).json(data));
})

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

const upload = multer({ storage: storage('collection') })

router.post('/', auth.validateToken, upload.single('collection_image'), (req, res) => {
    data.postImages('./api/data/collection.json', req.body.id, req.file.filename, `/public/collection/${req.file.filename}`)
        .catch(err => next(err))
        .then(data => res.status(200).json(data));
});





router.put('/', auth.validateToken, (req, res) => {
    if (req.body.id) {
        res.status(200).json(`image by id ${req.body.id} updated`); //
    } else {
        next(errors.newError('No ID provided / Bad Request', 400));
    }
});

router.delete('/', auth.validateToken, (req, res, next) => {
    if (req.body.id) {
        res.status(200).json(`image by id ${req.body.id} deleted`); //
    } else {
        next(errors.newError('No ID provided / Bad Request', 400));
    }
})


module.exports = router;
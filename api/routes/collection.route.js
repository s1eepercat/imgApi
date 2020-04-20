const auth = require('./../middleware/authentication');
const express = require('express');
const errors = require('./../middleware/errors');
const data = require('./../data/data');
const uploader = require('./../middleware/uploader');
const router = express.Router();


router.get('/', (req, res, next) => {
    data.getImages('./api/data/collection.json')
        .catch(err => next(err))
        .then(data => res.status(200).json(data));
})

router.post('/', auth.validateToken, uploader('collection').single('collection_image'), (req, res) => {
    data.postImages('./api/data/collection.json', req.body.id, req.file.filename, `/collection/${req.file.filename}`)
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
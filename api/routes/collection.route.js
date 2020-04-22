const auth = require('./../middleware/authentication');
const express = require('express');
const errors = require('./../middleware/errors');
const dataRequests = require('../data/data.requests');
const uploader = require('./../middleware/uploader');
const router = express.Router();


router.get('/', (req, res, next) => {
    dataRequests.getImages('./api/data/collection.json')
        .then(data => res.status(200).json(data));
})

router.post('/', auth.validateToken, uploader('collection').single('collection_image'), (req, res) => {
    dataRequests.postImages('./api/data/collection.json', req.body.id, `/collection/${req.file.filename}`)
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
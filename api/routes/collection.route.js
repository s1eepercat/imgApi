const auth = require('./../middleware/authentication');
const express = require('express');
const dataRequests = require('../data/data.requests');
const uploader = require('./../middleware/uploader');
const router = express.Router();

router.get('/', (req, res, next) => {
    dataRequests.getImages('./api/data/collection.json', req.query.id)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
})

router.post('/', auth.validateToken, uploader('collection').single('collection_image'), (req, res, next) => {
    dataRequests.postImages('./api/data/collection.json', req.body.id, `/collection/${req.file.filename}`)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
});

router.put('/', auth.validateToken, uploader('collection').single('collection_image'), (req, res, next) => {
    dataRequests.putImages('./api/data/collection.json', req.body.id, `/collection/${req.file.filename}`)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
});

router.delete('/', auth.validateToken, (req, res, next) => {
    dataRequests.deleteImages('./api/data/collection.json', req.body.id)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
});

module.exports = router;
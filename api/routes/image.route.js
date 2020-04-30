const auth = require('../middleware/authentication');
const express = require('express');
const dataRequests = require('../data/data.requests');
const uploader = require('../middleware/uploader');
const router = express.Router();

router.get('/', (req, res, next) => {
    dataRequests.getImages('./api/data/image.json', req.query.id)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
})

router.post('/', auth.validateToken, uploader('image').single('image'), (req, res, next) => {
    dataRequests.postImages('./api/data/image.json', req.body.id, `/image/${req.file.filename}`)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
});

router.put('/', auth.validateToken, uploader('image').single('image'), (req, res, next) => {
    dataRequests.putImages('./api/data/image.json', req.body.id, `/image/${req.file.filename}`)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
});

module.exports = router;
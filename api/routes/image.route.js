const auth = require('./../middleware/authentication');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.query.id) {
        res.status(200).json(`image by id ${req.query.id}`)
    } else {
        res.status(404).json('image not found')
    }
})

router.post('/', auth.validateToken, (req, res) => {
    res.status(200).json(`Image posted`);
});

router.put('/', auth.validateToken, (req, res) => {
    res.status(200).json(`Image updated`);
});

module.exports = router;
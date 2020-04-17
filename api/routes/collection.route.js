const auth = require('./../middleware/authentication');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json(`All images`)
})

router.post('/', auth.validateToken, (req, res) => {
    res.status(200).json(`Image posted`);
});

router.put('/', auth.validateToken, (req, res) => {
    res.status(200).json(`Image updated`);
});

router.delete('/', auth.validateToken, (req, res) => {
    if (req.body.id) {
        res.status(200).json(`image by id ${req.body.id} deleted`);
    } else {
        res.status(404).json('Id is not specified');
    }
})

module.exports = router;
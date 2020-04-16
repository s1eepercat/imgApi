const auth = require('./../middleware/authentication');
const express = require('express');
const router = express.Router();

router.post('/', auth.login);

module.exports = router;
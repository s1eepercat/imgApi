const auth = require('./middleware/authentication')
const express = require('express');
const router = express.Router();

router.get('/login', redirect);
router.get('/admin', redirect);

router.post('/login', auth.login);

router.get('/image', auth.validateToken, (req, res) => {
    res.status(200).json({ 'image': 'details' });
})

// router.get("/image", auth, async (req, res) => {
//     const user = await User.findById(req.user._id).select("-password");
//     res.send(user);
// });

// router.post('/image', (req, res) => {
//     if (auth.validateToken(true)) { //if token recieved
//         res.status(200).json('image posted with details');
//     }
// })

//put, delete

router.get('/collection', (req, res) => {
    res.status(200).json({ 'collecton': 'collecton' });
})


// router.post('/collection', (req, res) => {
//     if (auth.validateToken(true)) { //if token recieved
//         res.status(200).json('image posted to collection');
//     }
// })

//put, delete

module.exports = router;

function redirect(req, res) {
    res.redirect('/login.html')
};
const router = require('express').Router();

//Authentication
router.post('/signin');
router.post('/signup');

//Profile
// router.put('/:id');
router.patch('/:id');
router.delete('/:id');

//Wallet
router.get('/wallet');
// router.put('/wallet/:id');
router.patch('/wallet/:id');
router.delete('/wallet/:id');

module.exports = router;
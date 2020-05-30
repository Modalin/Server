const router = require('express').Router();
const ControllerInvestor = require('../controllers/investor');

//Authentication
router.post('/signin', ControllerInvestor.signIn);
router.post('/signup', ControllerInvestor.signUp);

//Profile
// router.put('/:id');
router.patch('/:id', ControllerInvestor.editProfile);
router.delete('/:id', ControllerInvestor.deleteProfile);

//Wallet
router.get('/wallet');
// router.put('/wallet/:id');
router.patch('/wallet/:id');
router.delete('/wallet/:id');

module.exports = router;
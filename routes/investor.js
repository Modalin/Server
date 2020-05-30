const router = require('express').Router();
const ControllerInvestor = require('../controllers/investor');
const { InvestorAuth } = require('../middlewares/authentication');

//Authentication
router.post('/signin', ControllerInvestor.signIn);
router.post('/signup', ControllerInvestor.signUp);

router.use(InvestorAuth);

//Profile
router.patch('/:id', ControllerInvestor.editProfile);
router.delete('/:id', ControllerInvestor.deleteProfile);

//Wallet
router.get('/wallet/', ControllerInvestor.showWallet);
router.patch('/wallet/', ControllerInvestor.editWallet);

//Business
router.get('/business');

module.exports = router;
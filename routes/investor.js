const router = require('express').Router();
const ControllerInvestor = require('../controllers/investor');
const { InvestorAuth } = require('../middlewares/authentication');

//Authentication
router.post('/signin', ControllerInvestor.signIn);
router.post('/signup', ControllerInvestor.signUp);

//Profile
router.get('/:id', ControllerInvestor.showProfile);
// router.patch('/', InvestorAuth, ControllerInvestor.editProfile);
// router.delete('/', InvestorAuth, ControllerInvestor.deleteProfile);

router.use(InvestorAuth);

//Wallet
router.get('/wallet', ControllerInvestor.showWallet);
router.patch('/wallet', ControllerInvestor.editWalletSaldo);

//Business
router.get('/business/:id', ControllerInvestor.showAllBusiness);
router.get('/invest/:id', ControllerInvestor.showInvestorBusiness);
router.patch('/business/:id', ControllerInvestor.investToBusiness);

module.exports = router;
const router = require('express').Router();
const ControllerInvestor = require('../controllers/investor');
const { InvestorAuth } = require('../middlewares/authentication');

//Authentication
router.post('/signin', ControllerInvestor.signIn);
router.post('/signup', ControllerInvestor.signUp);
router.get('/find/:id', ControllerInvestor.findInvestor)

//Profile
router.get('/', ControllerInvestor.showProfile);
router.patch('/', InvestorAuth, ControllerInvestor.editProfile);
// router.delete('/', InvestorAuth, ControllerInvestor.deleteProfile);

//Wallet
router.get('/wallet', InvestorAuth, ControllerInvestor.showWallet);
router.use(InvestorAuth)
router.patch('/wallet', ControllerInvestor.editWalletSaldo);

//Business
router.get('/business', ControllerInvestor.showAllBusiness);
router.get('/invest', ControllerInvestor.showInvestorBusiness);
router.patch('/business/:id', ControllerInvestor.investToBusiness);

module.exports = router;
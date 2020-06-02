const router = require('express').Router();
const MitraController = require('../controllers/mitra');
const { MitraAuth } = require('../middlewares/authentication'); 

//Auth
router.post('/signin', MitraController.signIn);
router.post('/signup', MitraController.signUp);
router.get('/business', MitraController.showBusiness);

router.use(MitraAuth)
// Profile
router.put('/:id');
router.patch('/:id');
router.delete('/:id');


//Business

router.post('/business', MitraController.createBusiness)
router.put('/business/:id', MitraController.updateAllBusiness);

//add investor
router.patch('/business/invest/:id', MitraController.addInvestor);

//update total_profit
router.patch('/business/profit/:id', MitraController.updateProfit);

//add report
router.patch('/bussiness/report/:id', MitraController.createReport)

// router.delete('/business/:id');

module.exports = router;
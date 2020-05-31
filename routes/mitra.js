const router = require('express').Router();
const MitraController = require('../controllers/mitra');
const { MitraAuth } = require('../middlewares/authentication'); 

//Auth
router.post('/signin', MitraController.signIn);
router.post('/signup', MitraController.signUp);

router.use(MitraAuth)
// Profile
router.put('/:id');
router.patch('/:id');
router.delete('/:id');

//Business
router.get('/business', MitraController.showBusiness);
router.post('/business', MitraController.createBusiness)
router.put('/business/:id', MitraController.updateBusiness);
router.patch('/business/:id');
router.delete('/business/:id');

module.exports = router;
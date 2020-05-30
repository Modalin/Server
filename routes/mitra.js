const router = require('express').Router();
const MitraController = require('../controllers/mitra');
// const { MitraAuth } = require('../middlewares/authentication'); 

// router.use(MitraAuth)
//Auth
router.post('/signin', MitraController.signIn);
router.post('/signup', MitraController.signUp);

//Profile
// router.put('/:id');
router.patch('/:id');
router.delete('/:id');

//Business
router.get('/business');
// router.put('/business/:id');
router.patch('/business/:id');
router.delete('/business/:id');

module.exports = router;
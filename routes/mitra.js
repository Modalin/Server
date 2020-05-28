const router = require('express').Router();

//Auth
router.post('/signin');
router.post('/signup');

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
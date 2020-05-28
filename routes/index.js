const router = require('express').Router();
const mitra = require('./mitra');
const investor = require('./investor');

router.use('/mitra', mitra);
router.use('/investor', investor);

module.exports = router;
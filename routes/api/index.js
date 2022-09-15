const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/friend', require('./friend'));

module.exports = router;
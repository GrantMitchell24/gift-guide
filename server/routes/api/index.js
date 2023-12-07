const router = require('express').Router();

const sampleRoutes = require('./sample.routes');
const userRoutes = require('./user.routes');
// const itemRoutes = require('./item.routes');
const groupRoutes = require('./group.routes');

router.use('/sample', sampleRoutes);
router.use('/user', userRoutes);
// router.use('/item', itemRoutes);
router.use('/group', groupRoutes);

module.exports = router;

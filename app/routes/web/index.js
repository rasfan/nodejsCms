const express = require('express');
const router = express.Router();

const adminRouter = require('./admin');
router.use('/admin', adminRouter);

const homeRouter = require('./home');
router.use('/', homeRouter);

module.exports = router;

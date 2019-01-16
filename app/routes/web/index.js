const express = require('express');
const router = express.Router();
require('app-module-path').addPath(__dirname);

// Admin Router
const adminRouter = require('app/routes/web/admin');
router.use('/admin', adminRouter);

// Home Router
const homeRouter = require('app/routes/web/home');
router.use('/', homeRouter);

// Middlewares
const redirectIfAuthenticated = require('./../../http/middlewares/redirectIfAuthenticated');
// Auth Router
const authRouter = require('app/routes/web/auth');
router.use('/auth', redirectIfAuthenticated.handle, authRouter);

module.exports = router;

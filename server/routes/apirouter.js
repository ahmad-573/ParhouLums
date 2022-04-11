const express = require(`express`)
const router = express.Router()
const { verifyToken } = require(`./auth`)



// Routes without verifyToken
router.use('/api', require('./loginout'));
router.use('/api', require('./signup'));
router.use('/api',require('./forgot-password'));

// Verify token
router.use(verifyToken);

// Routes with verifyToken
router.use('/api', require('./groupDashboard'));
router.use('/api', require('./important_routes'));
router.use('/api', require('./deleteGroup'));

module.exports = router;

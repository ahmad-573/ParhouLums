const express = require(`express`)
const router = express.Router()
const { verifyToken } = require(`./auth`)



// Routes without verifyToken
router.use('/api', require('./loginout'));
router.use('/api', require('./signup'));
router.use('/api', require('./forgot-password'));

// Verify token
router.use(verifyToken);

// Routes with verifyToken
router.use('/api', require('./groupDashboard'));
router.use('/api', require('./addParticipants'));
router.use('/api', require('./removeParticipants'));
router.use('/api', require('./promoteToAdmin'));
router.use('/api', require('./renameGroup'));

module.exports = router;

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
router.use('/api', require('./important_routes'));
router.use('/api', require('./deleteGroup'));
router.use('/api', require('./flashCard'));
router.use('/api', require('./topic'));
router.use('/api', require('./link'));
router.use('/api', require('./addParticipants'));
router.use('/api', require('./removeParticipants'));
router.use('/api', require('./promoteToAdmin'));
router.use('/api', require('./renameGroup'));
router.use('/api', require('./leaveGroup'));
router.use('/api', require('./createTask'));
router.use('/api', require('./getTasks'));
router.use('/api', require('./editTask'));
router.use('/api', require('./deleteTask'));
router.use('/api', require('./moveTask'));


module.exports = router;
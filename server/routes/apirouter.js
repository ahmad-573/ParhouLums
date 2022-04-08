const express = require(`express`)
const router = express.Router()
const { verifyToken } = require(`./auth`)



// Routes without verifyToken
router.use('/api', require('./loginout'));
router.use('/api', require('./signup'));


router.use(verifyToken);

// Routes with verifyToken



module.exports = router

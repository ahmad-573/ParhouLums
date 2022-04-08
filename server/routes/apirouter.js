const express = require(`express`)
const router = express.Router()
const { verifyToken } = require(`./auth`)



// login, sign up and signout routes
router.use('/api', require('./loginout'));
router.use(verifyToken);
router.use('/api', require('./signup'));



module.exports = router

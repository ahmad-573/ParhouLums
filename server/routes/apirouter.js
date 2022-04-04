const express = require(`express`)
const router = express.Router()
// import authorisation file later



// login, sign up and signout routes
router.use('/api',require('./signup'))
router.use('/api',require('./forgot-password'))

module.exports = router

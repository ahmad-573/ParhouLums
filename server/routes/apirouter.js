const express = require(`express`)
const router = express.Router()
// import authorisation file later



// login, sign up and signout routes
router.use('/api',require('./signup'))

module.exports = router

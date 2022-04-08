const express = require(`express`)
const router = express.Router()
const pool = require("../db");

// Get all groups of a user
router.post('/getAllGroups', (req,res) => {
    const { user_name } = req.body.username;
    try {
        
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: `Request failed. Try again.` })
    }
});


module.exports = router;
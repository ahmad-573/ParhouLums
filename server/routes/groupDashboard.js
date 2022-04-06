const express = require(`express`)
const router = express.Router()
const pool = require("../db");

// Get all groups of a user
router.post('/getAllGroups', (req,res) => {
    const { user_name } = req.body.username;
    try {
        const user_ids = await pool.query(
            "SELECT user_id FROM users WHERE username = $1", [user_name]  
        );
        const user_id = user_ids.rows[0];
        try {
           
        } catch (err) {
            console.log(err);
            res.status(400).json({ error: `Request failed. Try again.` })
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: `Request failed. Try again.` })
    }
});


module.exports = router;
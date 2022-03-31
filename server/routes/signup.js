const express = require(`express`)
const router = express.Router()
const pool = require("../db");

// Sign up post route
router.post('/signup', async (req,res) => {
    try {
        const { username } = req.body.username;
        const usernames = await pool.query(
            "SELECT username FROM users WHERE username = $1", [username]  
        );
        if ()
    } catch (err) {
        console.error(err.message);
        
    }
})

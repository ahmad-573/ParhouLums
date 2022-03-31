const e = require("express");
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
        if (usernames.rows != []){
            res.status(400).json({ error: `An account with this username exists. Please try again with a different username.` })
        }
        else{
            try {
                
                const email = await pool.query(
                    "SELECT email FROM users WHERE email = $1", [username]  
                );

            } catch (err) {
                res.status(400).json({ error: `Request failed. Try again.` })
            }
        }
    } catch (err) {
        res.status(400).json({ error: `Request failed. Try again.` })
        
    }
})

module.exports = router;

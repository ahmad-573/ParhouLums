const express = require(`express`)
const router = express.Router()
const pool = require("../db");
const helpers = require('./helper.js');
const { createToken } = require(`./auth`)

// Sign up post route
router.post('/signup', async (req,res) => {
    try {
        let username  = req.body.username;
        const usernames = await pool.query(
            "SELECT username FROM users WHERE username = $1", [username]  
        );
        if (usernames.rowCount > 0){
            res.status(400).json({ error: `An account with this username exists. Please try again with a different username.` })
        }
        else{
            let email = req.body.email;
            const emails = await pool.query(
                "SELECT email FROM users WHERE email = $1", [email]  
            );
            if (emails.rowCount > 0){
                res.status(400).json({ error: `An account with this email exists. Please try again with a different email.` })
            }
            else{
                const hash = await helpers.encrypt(req.body.password);
                
                const result = await pool.query(
                    "INSERT INTO users(username,password,fullname,email,question_field,answer) VALUES($1,$2,$3,$4,$5,$6) RETURNING user_id", [req.body.username,hash,req.body.fullname,req.body.email,req.body.question,req.body.answer]

                );
                console.log("signed up");
                const token = createToken(result.rows[0].user_id, []);
                res.cookie('token', token).status(200).json({})
            }

        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: `Request failed. Try again.` })
        
    }
})

module.exports = router;

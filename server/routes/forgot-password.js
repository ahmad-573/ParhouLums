const express = require(`express`)
const router = express.Router()
const pool = require("../db");

// Sign up post route
router.post('/forgot-password', async (req,res) => {
    try {
        const { email } = req.body.email;
        const emails = await pool.query(
            "SELECT email FROM users WHERE email = $1", [email]  
        );
        if (emails.rowCount === 0){
            res.status(400).json({ error: `Wrong email. Please enter the correct email address` })
        }
        else{
            try {
                const { question } = req.body.question;
                const questions = await pool.query(
                    "SELECT question_field FROM users WHERE email = $1", [email]  
        );
            } catch (err) {
                console.log(err);
                res.status(400).json({ error: `Request failed. Try again.` })
            }
        }
        
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: `Request failed. Try again.` })
    }
})

module.exports = router;
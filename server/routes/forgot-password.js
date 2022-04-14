const express = require(`express`)
const router = express.Router()
const pool = require("../db");
const helpers = require('./helper.js');

// forgot password post route
router.post('/forgot-password', async (req,res) => {
    try {
        const emails = await pool.query(
            "SELECT email FROM users WHERE email = $1", [req.body.email]  
        );
        if (emails.rowCount === 0){
            res.status(400).json({ error: `Wrong email. Please enter the correct email address` })
        }
        else{
            try {
                const questions = await pool.query(
                    "SELECT question_field FROM users WHERE email = $1", [req.body.email]
                );
                if (questions.rows[0].question_field === req.body.question){
                    try {
                        const answers = await pool.query(
                            "SELECT answer FROM users WHERE email = $1", [req.body.email]
                        );
                        if (answers.rows[0].answer === req.body.answer){
                            try {
                                const hash = await helpers.encrypt(req.body.new_password);

                                await pool.query(
                                    "UPDATE users SET password = $1 WHERE email = $2", [hash, req.body.email]
                                );
                                console.log("password changed!");
                                res.status(200).json({}) 
                            } catch (err) {
                                console.log(err);
                                res.status(400).json({ error: `Request failed. Try again.` })
                            }
                        }
                        else{
                            res.status(400).json({ error: `Wrong answer to the security question. Please try again` });
                        }
                    } catch (err) {
                        console.log(err);
                        res.status(400).json({ error: `Request failed. Try again.` })
                    }
                }
                else{
                    res.status(400).json({ error: `Wrong question field. Please choose the correct question field` });
                }
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
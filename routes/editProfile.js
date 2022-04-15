const express = require(`express`)
const router = express.Router()
const pool = require("../db");
const helpers = require('./helper.js');

// update Username
router.post('/updateUsername', async (req,res) => {
    let new_username = req.body.username;
    try {
       const result = await pool.query(
        "SELECT username FROM users where username = $1" , [new_username]
       ); 
       if (result.rowCount > 0) res.status(400).json({error: `Username is already taken.`});
       else{
           const result2 = await pool.query(
                "UPDATE users SET username = $1 WHERE user_id = $2" , [new_username, req.body.userid]
           );
           res.status(200).json({});
       }
    } catch (err) {
        console.log(err);
        res.status(400).json({error: `Request failed. Try again`});
    }
});

// update password
router.post('/updatePassword', async (req,res) => {
    let newpass = req.body.new_password;

    try {
        const result = await pool.query(
            "UPDATE users SET password = $1 WHERE user_id = $2" , [new_pass, req.body.userid]
       );
       res.status(200).json({});
    } catch (err) {
        console.log(err);
        res.status(400).json({error: `Request failed. Try again.`})
    }
});


module.exports = router;
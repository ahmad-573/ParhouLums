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
                "UPDATE users SET username = $1" , [new_username]
           );
           res.status(200).json({});
       }
    } catch (err) {
        console.log(err);
        res.status(400).json({error: `Request failed. Try again`});
    }
});

// update password



module.exports = router;
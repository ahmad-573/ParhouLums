const express = require(`express`);
const router = express.Router();
const pool = require("../db");


router.post('/getGroupUsers', async (req, res) => {
    try{
        const users_1 = await pool.query(
            "SELECT u.username, u.fullname, u.user_id FROM users AS u INNER JOIN group_membership AS g ON u.user_id = g.user_id WHERE g.group_id = $1", [req.body.group_id]
        );
        res.status(200).json({users: users_1.rows});
    } catch(err){
        console.log(err);
        res.status(400).json({ error: `Request failed. Try again.` })
    }
});


module.exports = router;
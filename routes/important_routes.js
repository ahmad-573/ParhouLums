const express = require(`express`)
const router = express.Router()
const pool = require("../db");
const { createToken } = require(`./auth`)

// check status of user
router.post('/checkStatus', async (req,res) => {
    let group = req.body.group_id;
    let user_id = req.body.userid;
    try {
        const result = await pool.query(
            "SELECT status FROM group_membership WHERE group_id = $1 AND user_id = $2 ", [group,user_id]
        );
        const q2 = await pool.query(
            "SELECT group_id FROM group_membership WHERE user_id = $1 AND status = 1", [user_id]
        );
        const token = createToken(user_id, q2.rows); 
        if (result.rowCount === 0){
            res.cookie('token',token).status(400).json({error: `Not in group`});
        }
        else{
            res.cookie('token', token).status(200).json(result.rows[0]);
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: `Some error occured` })
    }
});

module.exports = router;
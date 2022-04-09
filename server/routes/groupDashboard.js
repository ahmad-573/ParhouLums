const express = require(`express`)
const router = express.Router()
const pool = require("../db");

// Get all groups of a user
router.post('/getAllGroups', async (req,res) => {
    try {
        let user_id = req.body.userid;
        const user_groups = await pool.query(
            "SELECT group_name AS name, status, g.group_id FROM groups AS g INNER JOIN group_membership AS gm ON g.group_id = gm.group_id WHERE gm.user_id = $1 ", [user_id]
        );
        res.status(200).json({groups: user_groups.rows})
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: `Request failed. Try again.` })
    }
});

// Gets all the desired users, depending on request
router.post('/getUsers', async (req,res) => {
    let req_type = req.body.type;
    let curr_userid = req.body.userid;
    if (req_type === "new"){
        try {
            const users1 = await pool.query(
                "SELECT username, fullname, user_id FROM users WHERE user_id <> $1", [curr_userid]
            );
            
        } catch (err) {
            console.log(err);
            res.status(400).json({ error: `Request failed. Try again.` })
        }
    }
});

module.exports = router;
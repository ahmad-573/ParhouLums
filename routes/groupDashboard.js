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
    try {
        if (req_type == "new"){
            const users_1 = await pool.query(
                "SELECT username, fullname, user_id FROM users WHERE user_id <> $1", [curr_userid]
            );
            res.status(200).json({users1: users_1.rows,users2: []});
        }
        else if (req_type == "remove"){
            // check if admin because this is admin specific right
            let checkAdmin = req.body.adminlist.includes(req.body.group_id);
            if (!checkAdmin){
                res.status(400).json({ error: `Request failed. Try again.` })
            }
            else{
                const users_1 = await pool.query(
                    "SELECT u.username, u.fullname, u.user_id FROM users AS u INNER JOIN group_membership AS g ON u.user_id = g.user_id WHERE u.user_id <> $1 AND g.group_id = $2", [curr_userid, req.body.group_id]
                );
                res.status(200).json({users1: users_1.rows,users2: []});
            }
        }
        else if (req_type == "add"){
            // check if admin because this is admin specific right
            let checkAdmin = req.body.adminlist.includes(req.body.group_id);
            if (!checkAdmin){
                res.status(400).json({ error: `Request failed. Try again.` })
            }
            else{
                const users_1 = await pool.query(
                    "SELECT u.username, u.fullname, u.user_id FROM users AS u INNER JOIN group_membership AS g ON u.user_id = g.user_id WHERE u.user_id <> $1 AND g.group_id = $2", [curr_userid, req.body.group_id]
                );
                const all_users = await pool.query(
                    "SELECT username, fullname, user_id FROM users"
                );
                
                const users_2 = all_users.rows.filter((ele) => {!(users_1.rows.includes(ele))})
                res.status(200).json({users1: users_1.rows,users2: users_2});
            }
        }
        else if (req_type == "promote"){
            // check if admin because this is admin specific right
            let checkAdmin = req.body.adminlist.includes(req.body.group_id);
            if (!checkAdmin){
                res.status(400).json({ error: `Request failed. Try again.` })
            }
            else{
                const group_users = await pool.query(
                    "SELECT u.username, u.fullname, u.user_id, g.status AS status FROM users AS u INNER JOIN group_membership AS g ON u.user_id = g.user_id WHERE u.user_id <> $1 AND g.group_id = $2", [curr_userid, req.body.group_id]
                );
                let users = group_users.rows;
                let users_1 = [];
                let users_2 = [];
                for (let tmp of users){
                    let user = {username: tmp.username, fullname: tmp.fullname, user_id: tmp.user_id};
                    if (tmp.status === 1){
                        users_1.push(user);
                    }
                    else{
                        users_2.push(user);
                    }
                }
                res.status(200).json({users1: users_1,users2: users_2});
            }
        }
        
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: `Request failed. Try again.` })
    }
});

// Create a new group
router.post('/createGroup', async (req,res) => {
    let name = req.body.group_name;
    let ids = req.body.member_ids;
    let my_id = req.body.userid;
    try {
        const result = await pool.query(
            "INSERT INTO groups(group_name) VALUES ($1) RETURNING group_id", [name]
        );
        let newgroup_id = result.rows[0].group_id;
        try {
            const result2 = await pool.query(
                "INSERT INTO group_membership VALUES($1,$2,$3) ", [newgroup_id, my_id,1]
            );
        } catch (err) {
            console.log(err);
            const result3 = await pool.query(
                "DELETE FROM groups WHERE group_id = $1", [newgroup_id]
            );
            res.status(400).json({error: `Trouble Creating a new group. Try again.`})
        }
        for (let id of ids){
            try {
                const result4 = await pool.query(
                    "INSERT INTO group_membership VALUES($1,$2,0) ", [newgroup_id, id]
                );
            } catch (err) {
                console.log(err);
                res.status(400).json({error: `Group was created but there was trouble adding all the members into the new group.`});
            }
        }
        res.status(200).json({group_id: newgroup_id});
    } catch (err) {
        console.log(err);
        res.status(400).json({error: `Trouble Creating a new group. Try again.`})
    }
    

});


module.exports = router;
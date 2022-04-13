const express = require(`express`);
const router = express.Router();
const pool = require("../db");


router.post('/createTask', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM group_membership WHERE user_id = $1 AND group_id = $2", [req.body.userid, req.body.group_id]);
        if (result.rowCount == 0) {
            res.status(400).json({ error: `Not a group member.` });
            return
        }
        let q_str1 = "INSERT INTO task_list(group_id,title,category";
        let q_str2 = `(${req.body.group_id},'${req.body.title}',${req.body.category}`
        if (req.body.assign_to) {
            q_str1 = q_str1 + ",assign_to";
            q_str2 = q_str2 + `,${req.body.assign_to}`
            const check = await pool.query("SELECT * FROM group_membership WHERE user_id = $1 AND group_id = $2", [req.body.assign_to, req.body.group_id]);
            if (check.rowCount == 0) {
                res.status(400).json({ error: `Task can only be assigned to a group member.` });
                return
            }
        }
        if (req.body.description) {
            q_str1 = q_str1 + ",description";
            q_str2 = q_str2 + `,'${req.body.description}'`
        }
        if (req.body.deadline) {
            q_str1 = q_str1 + ",deadline";
            q_str2 = q_str2 + `,'${req.body.deadline}'`
        }

        const query_string = q_str1 + ") VALUES" + q_str2 + ") RETURNING task_id";
        const query_output = await pool.query(query_string);
        res.status(200).json({ task_id: query_output.rows[0].task_id })
    } catch (err) {
        res.status(400).json({ error: `Request failed. Try again.` })
    }
});


module.exports = router;
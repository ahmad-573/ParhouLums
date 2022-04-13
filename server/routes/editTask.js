const express = require(`express`);
const router = express.Router();
const pool = require("../db");


router.post('/editTask', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM group_membership WHERE user_id = $1 AND group_id = $2", [req.body.userid, req.body.group_id]);
        if (result.rowCount == 0) {
            res.status(400).json({ error: `Not a group member.` });
            return
        }
        const check_taskid = await pool.query("SELECT task_id FROM task_list WHERE task_id = $1 AND group_id = $2", [req.body.task_id, req.body.group_id]);
        if (check_taskid.rowCount == 0) {
            res.status(400).json({ error: `Task (ID) does not exist in this group.` });
            return
        }

        let q_str = `UPDATE task_list SET title = '${req.body.title}'`;
        if (req.body.assign_to) {
            const check = await pool.query("SELECT * FROM group_membership WHERE user_id = $1 AND group_id = $2", [req.body.assign_to, req.body.group_id]);
            if (check.rowCount == 0) {
                res.status(400).json({ error: `Task can only be assigned to a group member.` });
                return
            }
            q_str = q_str + `, assign_to = ${req.body.assign_to}`;
        }
        else
            q_str = q_str + `, assign_to = NULL`;

        if (req.body.description)
            q_str = q_str + `, description = '${req.body.description}'`;
        else
            q_str = q_str + `, description = NULL`;
        if (req.body.deadline)
            q_str = q_str + `, deadline = '${req.body.deadline}' `;
        else
            q_str = q_str + `, deadline = NULL `;


        await pool.query(
            q_str + `WHERE task_id = ${req.body.task_id};`
        );
        res.status(200).json({})
    } catch (err) {
        res.status(400).json({ error: `Request failed. Try again.` })
    }
});


module.exports = router;
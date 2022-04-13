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

        let q_str = `UPDATE task_list SET title = '${req.body.title}'`;
        if (req.body.description)
            q_str = q_str + `, description = '${req.body.description}'`;
        else
            q_str = q_str + `, description = NULL`;
        if (req.body.deadline)
            q_str = q_str + `, deadline = '${req.body.deadline}'`;
        else
            q_str = q_str + `, deadline = NULL`;
        if (req.body.assign_to)
            q_str = q_str + `, assign_to = ${req.body.assign_to} `;
        else
            q_str = q_str + `, assign_to = NULL `;

        await pool.query(
            q_str + `WHERE task_id = ${req.body.task_id};`
        );
        res.status(200).json({})
    } catch (err) {
        res.status(400).json({ error: `Request failed. Try again.` })
    }
});


module.exports = router;
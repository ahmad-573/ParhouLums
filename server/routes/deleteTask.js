const express = require(`express`);
const router = express.Router();
const pool = require("../db");


router.post('/deleteTask', async (req, res) => {
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

        await pool.query(
            "DELETE FROM task_list WHERE task_id = $1", [req.body.task_id]
        );
        res.status(200).json({})
    } catch (err) {
        res.status(400).json({ error: `Request failed. Try again.` })
    }
});


module.exports = router;
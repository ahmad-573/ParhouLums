const express = require(`express`);
const router = express.Router();
const pool = require("../db");


router.post('/moveTask', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM group_membership WHERE user_id = $1 AND group_id = $2", [req.body.userid, req.body.group_id]);
        if (result.rowCount == 0) {
            res.status(400).json({ error: `Not a group member.` });
            return
        }

        await pool.query(
            "UPDATE task_list SET category = $1 WHERE task_id = $2", [req.body.category, req.body.task_id]
        );
        res.status(200).json({})
    } catch (err) {
        res.status(400).json({ error: `Request failed. Try again.` })
    }
});


module.exports = router;
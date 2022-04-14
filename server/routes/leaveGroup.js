const express = require(`express`);
const router = express.Router();
const pool = require("../db");


router.post('/leaveGroup', async (req, res) => {
    try {
        const result = await pool.query("SELECT user_id, status FROM group_membership WHERE group_id = $1", [req.body.group_id]);
        let status = undefined;
        let numberOfAdmins = 0;
        for (let i = 0; i < result.rowCount; i++) {
            if (result.rows[i].user_id == req.body.userid)
                status = result.rows[i].status;

            if (result.rows[i].status == 1)
                numberOfAdmins++;
        }

        if (status == undefined) {
            res.status(400).json({ error: `Not a group member.` });
            return
        }
        if (status == 1 && numberOfAdmins == 1) {
            if (result.rowCount == 1) {
                await pool.query("DELETE FROM groups WHERE group_id = $1", [req.body.group_id]);
                res.status(200).json({});
                return
            }
            res.status(400).json({ error: "sole admin" });
            return
        }
        await pool.query(
            "DELETE FROM group_membership WHERE user_id = $1 AND group_id = $2", [req.body.userid, req.body.group_id]
        );
        res.status(200).json({})
    } catch (err) {
        res.status(400).json({ error: `Request failed. Try again.` })
    }
});


module.exports = router;
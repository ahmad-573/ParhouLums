const express = require(`express`);
const router = express.Router();
const pool = require("../db");


function returnFunction(arg1) {
    const checkEquality = function (arg2) { return arg1 == arg2 }
    return checkEquality;
}

router.post('/removeParticipants', async (req, res) => {
    try {
        const index = req.body.adminlist.findIndex(returnFunction(req.body.group_id));
        if (index == -1) {
            res.status(400).json({ error: `Not an admin.` });
            return
        }

        for (let i = 0; i < req.body.members.length; i++) {
            const res = await pool.query("SELECT status FROM group_membership WHERE user_id = $1 AND group_id = $2", [req.body.members[i], req.body.group_id]);
            if (res.rowCount > 0 && res.rows[0].status == 0) {
                await pool.query("DELETE FROM group_membership WHERE user_id = $1 AND group_id = $2", [req.body.members[i], req.body.group_id]);
            }
            else {
                res.status(400).json({ error: `Some member is not a valid non-admin group participant.` });
                return
            }
        }
        res.status(200).json({})
    } catch (err) {
        res.status(400).json({ error: `Request failed. Try again.` })
    }
});


module.exports = router;
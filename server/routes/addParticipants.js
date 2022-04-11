const express = require(`express`);
const router = express.Router();
const pool = require("../db");


function returnFunction(arg1) {
    const checkEquality = function (arg2) { return arg1 == arg2 }
    return checkEquality;
}

router.post('/addParticipants', async (req, res) => {
    try {
        const index = req.body.adminlist.findIndex(returnFunction(req.body.group_id));
        if (index == -1) {
            res.status(400).json({ error: `Not an admin.` });
            return
        }
        let str = "";
        let a = req.body.group_id;
        let b = undefined;
        let c = 0;
        for (let i = 0; i < req.body.members.length; i++) {
            b = req.body.members[i];
            str = str + `(${a},${b},${c}),`;
        }
        if (str != "") {
            q_str = "INSERT INTO group_membership(group_id, user_id, status) VALUES" + str.slice(0, -1) + ";";
            await pool.query(q_str);
        }
        res.status(200).json({})
    } catch (err) {
        res.status(400).json({ error: `Request failed. Try again.` })
    }
});


module.exports = router;
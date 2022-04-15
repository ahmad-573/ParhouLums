const express = require(`express`)
const router = express.Router()
const pool = require("../db");

router.post('/deleteGroup', async (req,res) => {
    let group = req.body.group_id;
    // check if admin because this is admin specific right
    let checkAdmin = req.body.adminlist.includes(req.body.group_id);
    if (!checkAdmin){
        res.status(400).json({ error: `Request failed. Try again.` })
    }
    else{
        try {
            const result = await pool.query(
                "DELETE FROM groups WHERE group_id = $1", [group]
            );
            res.status(200).json({});
        } catch (err) {
            console.log(err);
            res.status(400).json({error: `Request failed. Try again.`})
        }
    }
});


module.exports = router;

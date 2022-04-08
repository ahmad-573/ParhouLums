const express = require(`express`);
const router = express.Router();
const pool = require("../db");
const bcrypt = require(`bcrypt`);
const { createToken } = require(`./auth`)




// Log in
router.post('/login', async (req, res) => {
    try {
        const q1 = await pool.query(
            "SELECT user_id, password FROM users WHERE username = $1", [req.body.username]
        );
        if (q1.rowCount > 0) {
            const storedPassword = q1.rows[0].password;
            const correct = await bcrypt.compare(req.body.password, storedPassword);
            if (correct) {
                const q2 = await pool.query(
                    "SELECT group_id FROM group_membership WHERE user_id = $1 AND status = 1", [q1.rows[0].user_id]
                );
                const token = createToken(q1.rows[0].user_id, q2.rows);
                res.cookie('token', token).status(200).json({ user_id: q1.rows[0].user_id });
            } else {
                res.status(400).json({ error: 'Password is not correct.' });
            }
        }
        else {
            res.status(400).json({ error: 'Username does not exist.' });
        }
    }

    catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Request failed. Try again.' });
    }
})


// Log out
router.post('/logout', (req, res) => {
    res.clearCookie('token').status(200).json({});
})

module.exports = router;
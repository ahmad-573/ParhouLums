const express = require(`express`);
const router = express.Router();
const pool = require("../db");
const bcrypt = require(`bcrypt`);
//Authentication import (later)




// Log in
router.post('/login', async (req, res) => {
    try {
        const passwords = await pool.query(
            "SELECT password FROM users WHERE username = $1", [req.body.username]
        );
        if (passwords.rowCount > 0) {
            const storedPassword = passwords.rows[0].password;
            const correct = await bcrypt.compare(req.body.password, storedPassword);
            if (correct) {
                //const token = createToken(req.body.username, )
                res.status(200).json({});   //.cookie('token', token)
            } else {
                res.status(400).json({ error: 'Password is not correct.' });
            }
        }
        else {
            res.status(400).json({ error: 'Username does not exist.' });
        }
    }

    catch (err) {
        res.status(400).json({ error: 'Request failed. Try again.' });
    }
})


// Log out
router.post('/logout', (req, res) => {
    res.status(200).json({});     //.clearCookie('token')
})

module.exports = router;
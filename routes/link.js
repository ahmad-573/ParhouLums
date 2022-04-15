const express = require(`express`)
const router = express.Router()
const pool = require("../db");
const helpers = require('./helper.js');

// Get all links
router.post('/getLinks', async (req,res) => {
    if (await helpers.isUserInGroup(res,req.body.userid, req.body.group_id)){
        try {
            const result = await pool.query(
                "SELECT link_id, link, title FROM links WHERE topic_id = $1", [req.body.topic_id]
            );
            res.status(200).json({links: result.rows})
        } catch (err) {
            console.log(err);
            res.status(400).json({error: `Request failed. Try again`})
        }
    }
});

// Create a link
router.post('/addLink', async (req,res) => {
    if (await helpers.isUserInGroup(res,req.body.userid, req.body.group_id)){
        try {
            const result = await pool.query(
                "INSERT INTO links(topic_id,link,title) VALUES ($1,$2,$3) ", [req.body.topic_id, req.body.link,req.body.title]
            );
            res.status(200).json({})
        } catch (err) {
            console.log(err);
            res.status(400).json({error: `Request failed. Try again.`})
        }
    }
});

// Delete a link
router.post('/deleteLink', async (req,res) => {
    if (await helpers.isUserInGroup(res,req.body.userid, req.body.group_id)){
        try {
            const result = await pool.query(
                "DELETE FROM links WHERE link_id = $1 AND topic_id = $2", [req.body.link_id, req.body.topic_id]
            );
            res.status(200).json({})
        } catch (err) {
            console.log(err);
            res.status(400).json({error: `Request failed. Try again.`})
        }
    }
});

module.exports = router;
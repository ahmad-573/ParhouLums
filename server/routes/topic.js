const express = require(`express`)
const router = express.Router()
const pool = require("../db");
const helpers = require('./helper.js');

// Get all topics
router.post('/getTopics', async (req,res) => {
    if (await helpers.isUserInGroup(res,req.body.userid, req.body.group_id)){
        try {
            const result = await pool.query(
                "SELECT topic_id, title FROM topics WHERE group_id = $1", [req.body.group_id]
            );
            res.status(200).json({topics: result.rows})
        } catch (err) {
            console.log(err);
            res.status(400).json({error: `Request failed. Try again`})
        }
    }
});

// Create a topic
router.post('/addTopic', async (req,res) => {
    if (await helpers.isUserInGroup(res,req.body.userid, req.body.group_id)){
        try {
            const result = await pool.query(
                "INSERT INTO topics(group_id,title) VALUES ($1,$2) ", [req.body.group_id, req.body.title]
            );
            res.status(200).json({})
        } catch (err) {
            console.log(err);
            res.status(400).json({error: `Request failed. Try again.`})
        }
    }
});

// Delete a topic 
router.post('/deleteTopic', async (req,res) => {
    if (await helpers.isUserInGroup(res,req.body.userid, req.body.group_id)){
        try {
            const result = await pool.query(
                "DELETE FROM topics WHERE topic_id = $1 AND group_id = $2", [req.body.topic_id, req.body.group_id]
            );
            res.status(200).json({})
        } catch (err) {
            console.log(err);
            res.status(400).json({error: `Request failed. Try again.`})
        }
    }
});

// edit a topic
router.post('/editTopic', async (req,res) => {
    if (await helpers.isUserInGroup(res,req.body.userid, req.body.group_id)){
        try {
            const result = await pool.query(
                "UPDATE topics SET title = $1 WHERE topic_id = $2 AND group_id = $3", [req.body.new_title, req.body.topic_id, req.body.group_id]
            );
            res.status(200).json({})
        } catch (err) {
            console.log(err);
            res.status(400).json({error: `Request failed. Try again.`})
        }
    }
});




module.exports = router;
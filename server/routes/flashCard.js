const express = require(`express`)
const router = express.Router()
const pool = require("../db");
const helpers = require('./helper.js');

// create a card
router.post('/createCard', async (req,res) => {
    if (await helpers.isUserInGroup(res,req.body.userid, req.body.group_id)){
        try {
            const result = await pool.query(
                "INSERT INTO flashcards(group_id,title,description,rating) VALUES ($1,$2,$3,0) ", [req.body.group_id, req.body.title, req.body.description]
            );
            res.status(200).json({})
        } catch (err) {
            console.log(err);
            res.status(400).json({error: `Request failed. Try again.`})
        }
    }
});

// get all cards in group
router.post('/getCards', async (req,res) => {
    if (await helpers.isUserInGroup(res,req.body.userid, req.body.group_id)){
        try {
            const result = await pool.query(
                "SELECT card_id AS id, title, description FROM flashcards WHERE group_id = $1", [req.body.group_id]
            );
            res.status(200).json({cards: result.rows})
        } catch (err) {
            console.log(err);
            res.status(400).json({error: `Request failed. Try again.`})
        }
    }
}); 


module.exports = router;
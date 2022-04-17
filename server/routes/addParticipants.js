const express = require(`express`);
const router = express.Router();
const pool = require("../db");
const axios = require("axios")


function returnFunction(arg1) {
    const checkEquality = function (arg2) { return arg1 == arg2 }
    return checkEquality;
}

async function addUsersToChat(memberList, chatid, username){
    for (let mem of memberList){
        try {
            await axios.post(`https://api.chatengine.io/users/`,  {'username': mem.username, 'first_name': mem.username, 'last_name': mem.username, 'secret': process.env.CHAT_USER_PASSWORD}, { 'headers': {'PRIVATE-KEY': process.env.CHAT_PRIVATE_KEY} }); 
        } catch (error) {
            console.log("error in adding in users: ", error);
        }
        try {
            await axios.post(`https://api.chatengine.io/chats/${chatid}/people/`,  { "username": mem.username }, { 'headers': {'Project-ID': process.env.CHAT_PROJECT_ID, 'User-Name': username, 'User-secret': process.env.CHAT_USER_PASSWORD} });
        } catch (error) {
            console.log("error in adding in chat : ",error);
        }
    }
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
            const q_str = "INSERT INTO group_membership(group_id, user_id, status) VALUES" + str.slice(0, -1) + ";";
            await pool.query(q_str);
        }
        const res2 = await pool.query(
            "SELECT username FROM users WHERE user_id = $1 ", [req.body.userid]
        );
        member_names = []
        for (let mem of req.body.members){
            let x = await pool.query(
                "SELECT username FROM users WHERE user_id = $1", [mem]
            );
            member_names.push(x.rows[0])
        }
        addUsersToChat(member_names, req.body.chatid, res2.rows[0].username);
        res.status(200).json({})
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: `Request failed. Try again.` })
    }
});


module.exports = router;
const bcrypt = require('bcrypt');
const pool = require("../db");

async function encrypt(password) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

async function isUserInGroup(res,userid, groupid){
    try {
        const result = await pool.query(
            "SELECT * FROM group_membership WHERE user_id = $1 AND group_id = $2", [userid, groupid]
        ); 
        if (result.rowCount === 0) res.status(400).json({error: `Request failed. Try again.`})
        else return true
    } catch (err) {
        console.log(err)
        res.status(400).json({error: `Request failed. Try again.`})
    }
}

module.exports = { encrypt, isUserInGroup };
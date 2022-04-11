const bcrypt = require('bcrypt');
const pool = require("../db");

async function encrypt(password) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

async function isUserInGroup(userid, groupid){
    try {
        const result = await pool.query(
            "SELECT * FROM group_membership WHERE userid = $1 AND groupid = $2", [userid, groupid]
        ); 
        if (result.rowCount === 0) return "no"
        else return "yes"
    } catch (err) {
        return err
    }
}

module.exports = { encrypt, isUserInGroup };
const jwt = require(`jsonwebtoken`)
require('dotenv').config()
const key = process.env.SECRET_KEY;


function createToken(userid, admin_list) {
    return jwt.sign({ uid: userid, admin: JSON.stringify(admin_list) }, key, { expiresIn: 86400 });
}


function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        res.status(400).json({ error: 'Token error' })
        return
    }

    jwt.verify(token, key, function (err, decoded) {
        if (err) {
            res.status(400).json({ error: 'Token error' })
            return
        }

        req.body.userid = decoded.uid;
        req.body.adminlist = JSON.parse(decoded.admin);
        next();
    });
}


module.exports = { createToken, verifyToken }
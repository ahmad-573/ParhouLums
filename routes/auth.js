const jwt = require(`jsonwebtoken`)
const key = process.env.SECRET_KEY; 


function createToken(userid, query_res) {
    const admin_list = [];
    for (let i = 0; i < query_res.length; i++)
        admin_list.push(query_res[i].group_id);
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

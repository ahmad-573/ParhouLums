const path = require("path");
const Pool = require("pg").Pool;
const fs = require('fs');

const pool = new Pool({
    user: 'doadmin',
    password: 'AVNS_FQAFGBgKUByO9XH',
    host: 'db-postgresql-blr1-05163-do-user-11369164-0.b.db.ondigitalocean.com',
    port: 25060,
    database: 'parhoulums'
    ssl: {
      require: true, 
      rejectUnauthorized: false, 
      ca: fs.readFileSync(path.join(__dirname, 'ca-certificate.crt')).toString()
    }
});

module.exports = pool;

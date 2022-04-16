const Pool = require("pg").Pool;
const con_string = process.env.DB_STRING;

const pool = new Pool({
    con_string
});

module.exports = pool;


/*
user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    sslmode: 'require'
    */

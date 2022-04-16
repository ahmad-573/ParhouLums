const Pool = require("pg").Pool;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
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

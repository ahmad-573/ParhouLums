const Pool = require("pg").Pool;
//const { parseSsl } = require('pg-ssl');

const pool = new Pool({
    user: 'doadmin',
    password: 'AVNS_FQAFGBgKUByO9XH',
    host: 'db-postgresql-blr1-05163-do-user-11369164-0.b.db.ondigitalocean.com',
    port: 25060,
    database: 'parhoulums',
    /*dialect: "postgres",
    dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false // This line will fix new error
    }
  }*/
    //sslmode: 'require'
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
// connectionString: process.env.DATABASE_URL
/*
ssl: parseSsl({
         sslmode: 'require'
    })
    */

/*dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }*/

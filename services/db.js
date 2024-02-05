require('dotenv').config()
const pg = require("pg");

const config = {
    user: process.env.DB_USER,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on("connect", () => {
    console.log("connected to the Database");
});

const createTables = () => {
    const imagesTable = `CREATE TABLE IF NOT EXISTS
        images(
            id SERIAL PRIMARY KEY,
            title VARCHAR(128) NOT NULL,
            cloudinary_id VARCHAR(128) NOT NULL,
            img_url VARCHAR(128) NOT NULL
        )`;
    console.log('creating images table...')
    pool.query(imagesTable)
        .then((res) => {
            console.log('createTables response', res)
            pool.end()
        })
        .catch((err) => {
            console.log('aborting images table...')
            console.log(err)
            pool.end()
        })
};

module.exports = {
    createTables,
    pool,
};

require("make-runnable");
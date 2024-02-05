// const pool = require('./db').pool
import { pool } from './db'

const imagesTable = `CREATE TABLE IF NOT EXISTS
    images(
        id SERIAL PRIMARY KEY,
        title VARCHAR(128) NOT NULL,
        cloudinary_id VARCHAR(128) NOT NULL,
        image_url VARCHAR(128) NOT NULL
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
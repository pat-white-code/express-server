import { pool } from './db.js'

const imagesTable = `CREATE TABLE IF NOT EXISTS
    images(
        id SERIAL PRIMARY KEY,
        title VARCHAR(128) NOT NULL,
        cloudinary_id VARCHAR(128) NOT NULL,
        image_url VARCHAR(128) NOT NULL
    )`;

const cardsTable = `CREATE TABLE IF NOT EXISTS
cards(
    id UUID PRIMARY KEY,
    multiverseId INT,
    name VARCHAR(250) NOT NULL,
    rarity VARCHAR(50) NOT NULL,
    image_url VARCHAR(250) NOT NULL
);`;

console.log('creating images table...')
pool.query(imagesTable)
    .then((res) => {
        console.log('createTables response', res)
    })
    .catch((err) => {
        console.log('aborting images table...')
        console.log(err)
        pool.end()
    })

pool.query(cardsTable)
    .then((res) => {
        console.log('cardsTable response', res)
        pool.end()
    })
    .catch((err) => {
        console.log('aborting cardsTable...')
        console.log(err)
        pool.end()
    })

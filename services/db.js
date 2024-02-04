import {} from 'dotenv/config'
import pg from 'pg'

const config = {
    user: process.env.DB_USER,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000,
};

export const pool = new pg.Pool(config);

pool.on('connect', () => {
    console.log('connected to the Database');
});

export const createTables = () => {
    const schoolTable = `CREATE TABLE IF NOT EXISTS
        students(
            id SERIAL PRIMARY KEY,
            student_name VARCHAR(128) NOT NULL,
            student_age INT NOT NULL,
            student_class VARCHAR(128) NOT NULL,
            parent_contact VARCHAR(128) NOT NULL,
            admission_date VARCHAR(128) NOT NULL
        )`;
    const petsTable = `CREATE TABLE IF NOT EXISTS
        pets(
            id SERIAL PRIMARY KEY,
            student_name VARCHAR(128) NOT NULL,
            student_age INT NOT NULL,
            student_class VARCHAR(128) NOT NULL,
            parent_contact VARCHAR(128) NOT NULL,
            admission_date VARCHAR(128) NOT NULL
        )`;
    pool.query(schoolTable)
    pool.query(petsTable)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

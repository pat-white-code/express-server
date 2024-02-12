import 'dotenv/config';
import pg from 'pg';

const config = {
    user: process.env.DB_USER,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000,
};

export const pool = new pg.Pool(config);

pool.on("connect", () => {
    console.log("connected to the Database"); // tslint:disable-line:no-console
});
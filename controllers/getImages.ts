import { Pool } from "pg"

const getImages = async (pool: Pool) => {
    const client = await pool.connect()

    const query = `SELECT * FROM images`

    try {
        const dbResponse = await client.query(query)
        return dbResponse
    } catch (error) {
        throw new Error()
    }
}

export default getImages
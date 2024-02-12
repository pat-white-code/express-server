import { Pool, QueryResult } from "pg"

interface CreateImagePayload {
    title: string
    cloudinary_id: string
    image_url: string
}

interface Image {
    id: string,
    title: string,
    cloudinary_id: string,
    image_url: string,
}

export interface DbResponse {
    rows: Image[]
}

const createImage = async (pool: Pool, { title, cloudinary_id, image_url }: CreateImagePayload) => {
    const client = await pool.connect()

    const query: string = `
            INSERT INTO images (
                title,
                cloudinary_id,
                image_url
            )
            VALUES (
                $1,$2,$3
            )
            RETURNING *
            `

    const values = [title, cloudinary_id, image_url]
    // const dbResponse: QueryResult<Image> = await client.query(query, values)
    // return dbResponse
    try {
        const dbResponse: QueryResult<Image> = await client.query(query, values)
        return dbResponse
    } catch (error) {
        throw error
    }
}

export default createImage
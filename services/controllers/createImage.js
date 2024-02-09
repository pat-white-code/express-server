const createImage = async (pool, { title, cloudinary_id, image_url }) => {
    const client = await pool.connect()

    const query = `
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

    try {
        const dbResponse = await client.query(query, values)
        return dbResponse
    } catch (error) {
        return error
    }
}

export default createImage
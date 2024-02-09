const getImages = async pool => {
    const client = await pool.connect()

    const query = `SELECT * FROM images`

    try {
        const dbResponse = await client.query(query)
        return dbResponse
    } catch (error) {
        return error
    }
}

export default getImages
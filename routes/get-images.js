import { pool } from '../services/db.js'
import selectAllImages from '../services/controllers/getImages.js';

const handleGetImages = async (req, res) => {
    try {
        const result = await selectAllImages(pool)
        const rows = result.rows
        const data = {
            images: rows
        }
        res.status(200).send({
            message: 'success',
            data
        })
    } catch (error) {
        res.status(400).send({
            message: 'request failed',
            error
        })
    }
}

const getImages = app => {
    return app.get('/images', handleGetImages)}

export default getImages
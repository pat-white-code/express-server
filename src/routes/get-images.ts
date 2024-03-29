import { pool } from '../services/db.js'
import { Request, Response } from 'express'
import { Application } from 'express'
import selectAllImages from '../controllers/getImages.js';

const handleGetImages = async (req: Request, res: Response) => {
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

const getImages = (app: Application) => {
    return app.get('/images', handleGetImages)}

export default getImages
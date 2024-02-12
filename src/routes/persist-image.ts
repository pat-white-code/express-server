import { Application } from 'express'
import { initCloudinary } from '../cloudinary.js'
import { pool } from '../services/db.js'
import createImage from '../controllers/createImage.js'
import { Request, Response } from 'express'

const cloudinary = initCloudinary();


const persistImageHandler = async (req: Request, res: Response) => {
    const img = req.body.img
    const title = req.body.title || ''
    if (!img) {
        res.status(400).send({
            error: 'no image provided'
        })
    }
    try {
        const cloudinaryRes = await cloudinary.uploader.upload(img)
        const cloudinary_id = cloudinaryRes.public_id // tslint:disable-line:variable-name
        const image_url = cloudinaryRes.secure_url // tslint:disable-line:variable-name

        const result = await createImage(pool, { title, image_url, cloudinary_id })
        // if (!result) {
        //     return
        // }
        const row = result.rows[0]

        const data = {
            img_url: row.image_url,
            title: row.title,
            cloudinary_id: row.cloudinary_id
        }

        res.status(201).send({
            message: 'success',
            data
        })
    } catch (error) {
        res.status(400).send({
            message: 'upload failed',
            error
        })
    }
}

const persistImage = (app: Application) => {
    return app.post('/persist-image', persistImageHandler)}

export default persistImage
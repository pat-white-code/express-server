import bodyParser from 'body-parser';
import express from 'express';
import initCloudinary from './cloudinary.js';
          
const cloudinary = initCloudinary();

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/upload-image', async (req, res) => {
    const data = {
        image: req.body.image,
    };
    try {
        const cloudinaryResponse = await cloudinary.uploader.upload(data.image)
        res.status(201).send({
            message: "image succesfully uploaded",
            details: cloudinaryResponse
        });
    } catch (error) {
        res.status(400).send({
            message: 'failed to upload',
            error
        })
    }
})

export default app;
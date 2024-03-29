import bodyParser from 'body-parser'
import express, { Application } from 'express'
import persistImage from './routes/persist-image.js'
import getImages from './routes/get-images.js'

const app: Application = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

persistImage(app)
getImages(app)

export default app
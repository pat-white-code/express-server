import bodyParser from 'body-parser'
import express from 'express'
import persistImage from './routes/persist-image'
import getImages from './routes/get-images'

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

persistImage(app)
getImages(app)

export default app
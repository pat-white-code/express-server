import bodyParser from 'body-parser'
import express from 'express'
import { initCloudinary } from './cloudinary'
import { pool } from './services/db'
import persistImage from './routes/persist-image'
import getImages from './routes/get-images'

const cloudinary = initCloudinary();

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.get('/students', (req, res) => {
//     pool.connect((err, client, done) => {
//         const query = 'SELECT * FROM students';
//         client.query(query, (error, result) => {
//             done();
//             if (error) {
//                 res.status(400).json({ error })
//             }
//             if (result.rows < '1') {
//                 res.status(404).send({
//                     status: 'Failed',
//                     message: 'No student information found',
//                 });
//             } else {
//                 res.status(200).send({
//                     status: 'Successful',
//                     message: 'Students Information retrieved',
//                     students: result.rows,
//                 });
//             }
//         });
//     });
// });

persistImage(app)
getImages(app)

// app.get('/student/:id', (req, res) => {
//     pool.connect((error, client, done) => {
//         const id = req.params.id;

//         const query = `
//     SELECT * FROM students 
//         WHERE id = $1
//     `
//         const values = [id]
//         client.query(query, values, (error, result) => {
//             done();
//             if (error) {
//                 res.status(400).json({ error })
//             }
//             if (result.rows < '1') {
//                 res.status(404).send({
//                     status: 'Failed',
//                     message: 'No student information found',
//                 });
//             } else {
//                 res.status(200).send({
//                     status: 'Successful',
//                     message: 'Students Information retrieved',
//                     students: result.rows,
//                 });
//             }
//         })
//     });
// })

// app.post('/add-student', (req, res) => {
//     const {
//         studentName,
//         studentAge,
//         studentClass,
//         parentContact,
//         admissionDate
//     } = req.body;

//     pool.connect((err, client, done) => {
//         const query = `
//             INSERT INTO students(
//                 student_name,
//                 student_age,
//                 student_class,
//                 parent_contact,
//                 admission_date
//             )
//             VALUES ($1, $2, $3, $4, $5)
//             RETURNING *;
//         `
//         const values = [studentName, studentAge, studentClass, parentContact, admissionDate || new Date()]

//         client.query(query, values, (err, result) => {
//             done();
//             if (err) {
//                 res.status(400).json({ errror: err })
//             }
//             res.status(201).send({
//                 status: 'Success',
//                 result: result.rows[0]
//             })
//         })
//     })
// })

// app.post('/upload-image', async (req, res) => {
//     const data = {
//         image: req.body.image,
//     };
//     try {
//         const cloudinaryResponse = await cloudinary.uploader.upload(data.image)
//         res.status(201).send({
//             message: "image succesfully uploaded",
//             details: cloudinaryResponse
//         });
//     } catch (error) {
//         res.status(400).send({
//             message: 'failed to upload',
//             error
//         })
//     }
// })

export default app
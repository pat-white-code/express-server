// import bodyParser from 'body-parser'
const bodyParser = require('body-parser')
// import express from 'express'
const express = require('express')
const initCloudinary = require('./cloudinary.js')
// import initCloudinary from './cloudinary.js'
const pool = require('./services/db.js').pool
// const db = require('services.js');
// import { pool } from './services/db.js'

const cloudinary = initCloudinary();

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/students', (req, res) => {
    pool.connect((err, client, done) => {
        const query = 'SELECT * FROM students';
        client.query(query, (error, result) => {
            done();
            if (error) {
                res.status(400).json({ error })
            }
            if (result.rows < '1') {
                res.status(404).send({
                    status: 'Failed',
                    message: 'No student information found',
                });
            } else {
                res.status(200).send({
                    status: 'Successful',
                    message: 'Students Information retrieved',
                    students: result.rows,
                });
            }
        });
    });
});

app.post('/persist-image', async (req, res) => {
    debugger
    const img = req.body.img
    const title = req.body.title || ''
    if (!img) {
        res.status(400).send({
            error: 'no image provided'
        })
    }
    try {
        const cloudinaryRes = await cloudinary.uploader.upload(img)
        pool.connect(async (err, client) => {
            debugger
            const insertQuery = `INSERT INTO images (title, cloudinary_id, image_url) VALUES (
                $1,$2,$3
            )
            RETURNING *
            `
            const values = [title, cloudinaryRes.public_id, cloudinaryRes.secure_url]
            try {
                const dbRes = await client.query(insertQuery, values)
                const result = dbRes.rows[0]
                res.status(201).send({
                    data: {
                        message: 'Image Uploaded Successfully',
                        title,
                        cloudinary_id: result.cloudinary_id,
                        image_url: result.image_url,
                    },
                    status: 'success',
                })
            } catch (error) {
                res.status(500).send({
                    message: 'failure',
                    error,
                })
            }
        })
    } catch(error) {
        res.status(400).send({
            message: 'upload failed',
            error
        })
    }
})

app.get('/student/:id', (req, res) => {
    pool.connect((error, client, done) => {
        debugger
        const id = req.params.id;

        const query = `
    SELECT * FROM students 
        WHERE id = $1
    `
        const values = [id]
        client.query(query, values, (error, result) => {
            done();
            if (error) {
                res.status(400).json({ error })
            }
            if (result.rows < '1') {
                res.status(404).send({
                    status: 'Failed',
                    message: 'No student information found',
                });
            } else {
                res.status(200).send({
                    status: 'Successful',
                    message: 'Students Information retrieved',
                    students: result.rows,
                });
            }
        })
    });
})

app.post('/add-student', (req, res) => {
    const {
        studentName,
        studentAge,
        studentClass,
        parentContact,
        admissionDate
    } = req.body;

    pool.connect((err, client, done) => {
        const query = `
            INSERT INTO students(
                student_name,
                student_age,
                student_class,
                parent_contact,
                admission_date
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `
        const values = [studentName, studentAge, studentClass, parentContact, admissionDate || new Date()]

        client.query(query, values, (err, result) => {
            debugger
            done();
            if (err) {
                res.status(400).json({ errror: err })
            }
            res.status(201).send({
                status: 'Success',
                result: result.rows[0]
            })
        })
    })
})

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

module.exports = app
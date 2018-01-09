const express = require('express')
const router = express.Router();
const StudentService = require('../services/student-service') //replace with whatever service you have
const ClassService = require('../services/class-service') //replace with whatever service you have


// router.get('/', async (req, res, next) => {
//     const classes = await ClassService.findAll()
//     res.render('course', { classes })
// });


// router.post('/add', async (req, res, next) => {
//     const course = await ClassService.add(req.body)
//     res.send(course)
// })



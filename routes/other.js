const express = require('express')
const router = express.Router();
const StudentService = require('../services/student-service') //replace with whatever service you have
const ClassService = require('../services/class-service') //replace with whatever service you have


router.get('/', async (req, res, next) => {
    const students = await StudentService.findAll()
    res.render('student', { students })
});


router.post('/add', async (req, res, next) => {
    const student = await StudentService.add(req.body)
    res.send(student)
})



module.exports = router;
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

router.post('/add-to-course', async (req, res, next) => {
    const newMatriculation = await StudentService.addToCourse(req.body.studentID, req.body.classID)
    res.send(newMatriculation)
})

router.post('/give-options', async (req, res, next) => {
    const courseSelection = await StudentService.giveCourseOptions(req.body.studentID)
    res.send(courseSelection)
})

router.post('/del', async (req, res, next) => {
    const deletion = await StudentService.del(req.body.studentID)
    res.send('OK!')
})

// router.post('/del', async (req, res, next) => {
//     await StudentService.del(req.body.studentID)
//     res.send('OK!')
// })


module.exports = router;
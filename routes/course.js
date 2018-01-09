const express = require('express')
const router = express.Router();
const StudentService = require('../services/student-service') //replace with whatever service you have
const ClassService = require('../services/class-service') //replace with whatever service you have

router.post('/add', async (req, res, next) => {
    const course = await ClassService.add(req.body)
    res.send(course)
})

// router.get('/', async (req, res, next) => {
//     const classes = await ClassService.findAll()
//     res.render('course', { classes })
// });


router.post('/close-enrolment', async (req, res, next) => {
    const newStatus = await ClassService.closeEnrolment()
    res.send(newStatus)
})

router.post('/del', async (req, res, next) => {
    await ClassService.del(req.body.classID)
    res.send('OK!')
})

module.exports = router;
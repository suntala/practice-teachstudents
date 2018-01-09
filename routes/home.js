const express = require('express')
const router = express.Router();
const StudentService = require('../services/student-service') //replace with whatever service you have
const ClassService = require('../services/class-service') //replace with whatever service you have


router.get('/', async (req, res, next) => {
    res.render('index')
});

/*
router.post('/', async (req, res, next) => {
    const landlord = await LandlordService.add(req.body)
    res.send(landlord)
})
*/

// router.post('/course/add', async (req, res, next) => {
//     const course = await ClassService.add(req.body)
//     res.send(course)
// })

module.exports = router;
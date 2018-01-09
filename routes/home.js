const express = require('express')
const router = express.Router();
const StudentService = require('../services/student-service') //replace with whatever service you have
const ClassService = require('../services/class-service') //replace with whatever service you have


router.get('/', async (req, res, next) => {
    res.render('index')
});


module.exports = router;
const express = require('express')
const router = express.Router();
const LandlordService = require('../services/landlord-service') //replace with whatever service you have

/*
router.get('/', async (req, res, next) => {
    res.render('index')
});

router.post('/', async (req, res, next) => {
    const landlord = await LandlordService.add(req.body)
    res.send(landlord)
})
*/


module.exports = router;
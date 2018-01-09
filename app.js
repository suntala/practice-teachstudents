const express = require('express')
const bodyParser = require('body-parser')
require(`./database-connection`)

const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.set('view engine', 'pug')


const home = require('./routes/home')
// const restaurant = require('./routes/restaurant')
// const me = require('./routes/edit-restaurant')


app.use('/', home)
// app.use('/restaurant', restaurant)
// app.use('/inputform', me)



module.exports = app
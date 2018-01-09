const express = require('express')
const bodyParser = require('body-parser')
require(`./database-connection`)

const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.set('view engine', 'pug')


const home = require('./routes/home')
const student = require('./routes/student')
const course = require('./routes/course')


app.use('/', home)
app.use('/student', student)
app.use('/course', course)


module.exports = app
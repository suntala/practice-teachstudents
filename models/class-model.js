const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)


const ClassSchema = mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number
    },
    currentStudents: [],
    totalSessions: {
        type: Number
    },
    startTime: {
        type: Number
    },
    endTime: {
        type: Number
    },
    enrolling: {
        type: Boolean
    }
})


ClassSchema.plugin(AutoIncrement, { inc_field: 'classID' })  //change to whatever the model is called (helps to give it special name instead of just id) (1)
module.exports = mongoose.model('Class', ClassSchema)  //change to whatever the model is called (2)
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)


const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: Number
    },
    schedule: [],
    pGrade: {
        type: String
    }
})


StudentSchema.plugin(AutoIncrement, { inc_field: 'studentID' })  //change to whatever the model is called (helps to give it special name instead of just id) (1)
module.exports = mongoose.model('Student', StudentSchema)  //change to whatever the model is called (2)

/*
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
    }
})

*/
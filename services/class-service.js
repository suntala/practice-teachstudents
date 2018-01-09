const fs = require('fs')
const ClassModel = require('../models/class-model')   //change to whatever model name you have (2)
const StudentModel = require('../models/student-model')   //change to whatever model name you have (2)
const StudentService = require('./student-service')



const add = async (course) => {
    return ClassModel.create(course)
}

const findAll = async () => {
    return ClassModel.find()
}

const del = async (classID) => {
    return ClassModel.remove({ classID })
}

const find = async (classID) => {
    return ClassModel.findOne({ classID })
}

const edit = async (classID, data) => {
    const course = await ClassModel.findOne({ classID })

    if (typeof data.subject !== 'undefined'){ course.subject = data.subject }     
    if (typeof data.level !== 'undefined'){ course.level = data.level }
    if (typeof data.capacity !== 'undefined'){ course.capacity = data.capacity }
    if (typeof data.currentStudents !== 'undefined'){ course.currentStudents = data.currentStudents } 
    if (typeof data.totalSessions !== 'undefined'){ course.totalSessions = data.totalSessions }

    const newCourse = await course.save();
    return newCourse;
}


module.exports = {
    findAll,
    add,
    del,
    find,
    edit
}
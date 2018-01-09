const fs = require('fs')
const StudentModel = require('../models/student-model')   //change to whatever model name you have (2)
const ClassModel = require('../models/class-model')   
const ClassService = require('./class-service')

const add = async (student) => {
    return StudentModel.create(student)
}

const findAll = async () => {
    return StudentModel.find()
}

const del = async (studentID) => {
    return StudentModel.remove({ studentID })
}

const find = async (studentID) => {
    return StudentModel.findOne({ studentID })
}

const edit = async (studentID, data) => {
    const student = await StudentModel.findOne({ studentID })

    if (typeof data.name !== 'undefined'){ student.name = data.name }     
    if (typeof data.level !== 'undefined'){ student.level = data.level }
    if (typeof data.schedule !== 'undefined'){ student.schedule = data.schedule }
    if (typeof data.pGrade !== 'undefined'){ student.pGrade = data.pGrade }

    const newStudent = await student.save();
    return newStudent;
}





module.exports = {
    findAll,
    add,
    del,
    find,
    edit
}
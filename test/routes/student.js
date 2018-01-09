import test from 'ava'
import request from 'supertest'
import app from '../../app'

const StudentService = require('../../services/student-service') //replace with whatever service you have
const ClassService = require('../../services/class-service') //replace with whatever service you have
const StudentModel = require('../../models/student-model')   //change to whatever model name you have (2)
const ClassModel = require('../../models/class-model')   

test('Get student main page', async t => {
    const input = {name:'Test', level: 1, schedule: [], pGrade: 'A'}

    const student = (await request(app)
        .post('/student/add')
        .send(input))
        .body  

    const res = await request(app)
        .get('/student')
    
    t.is(res.status, 200)
    t.regex(res.text, /Test/)
})

test('Add student to course', async t => {
    const inputS = {name:'TestStudent', level: 1, schedule: [], pGrade: 'A'}

    const student = (await request(app)
        .post('/student/add')
        .send(inputS))
        .body  

    const inputC = {subject: 'TestCourse', level: 1, capacity: 4, currentStudents: [], totalSessions: 5}

    const course = (await request(app)
        .post('/course/add')
        .send(inputC))
        .body

    const input = {studentID: student.studentID, classID: course.classID}

    // console.log(input)

    const res = await request(app)
        .post('/student/add-to-course')
        .send(input)

    t.is(res.status, 200)
    t.is(res.body[0].schedule.length, 1)
    t.is(res.body[1].currentStudents.includes('TestStudent'), true)
})

test('Give student options, new enrolment', async t => {
    const inputS = {name:'TestStudent', level: 1, schedule: [], pGrade: 'A'}

    const student = (await request(app)
        .post('/student/add')
        .send(inputS))
        .body 
    
    const inputC = {subject: 'TestCourse', level: 1, capacity: 4, currentStudents: [], totalSessions: 5}

    const course = (await request(app)
        .post('/course/add')
        .send(inputC))
        .body

    const input = {studentID: student.studentID}

    const res = await request(app)
        .post('/student/give-options')
        .send(input)
    
    // console.log(res.body)
    
    t.is(res.status, 200)
})




test('Give student options, already enrolled', async t => {
    const inputS = {name:'TestStudent', level: 1, schedule: [{subject: 'German', level: 1, capacity: 3, currentStudents: [], totalSessions: 10, startTime: 900, endTime: 1000}], pGrade: 'A'}

    const student = (await request(app)
        .post('/student/add')
        .send(inputS))
        .body 
    
    const inputC = {subject: 'TestCourse', level: 1, capacity: 4, currentStudents: [], totalSessions: 5}

    const course = (await request(app)
        .post('/course/add')
        .send(inputC))
        .body

    const input = {studentID: student.studentID}

    const res = await request(app)
        .post('/student/give-options')
        .send(input)
    
    // console.log(res.body)
    
    t.is(res.status, 200)
})



test('Delete a student', async t => {
    const input = {name:'TestStudent', level: 1, schedule: [], pGrade: 'F'}

    const student = (await request(app)
        .post('/student/add')
        .send(input))
        .body  

    const res = await request(app)
        .post('/student/del')
        .send({studentID: student.studentID})

    console.log(res.body)
    
    t.is(res.status, 200)
    // t.is(res.body, 'OK!')
    t.is(res.text, 'OK!')
})







// test('Add student to course', async t => {
//     const inputS = {name:'TestStudent', level: 1, schedule: [], pGrade: 'A'}

//     const student = (await request(app)
//         .post('/student/add')
//         .send(inputS))
//         .body  

//     const inputC = {subject: 'TestCourse', level: 1, capacity: 4, currentStudents: [], totalSessions: 5}

//     const course = (await request(app)
//         .post('/course/add')
//         .send(inputC))
//         .body

//     const input = {studentID: student.studentID, classID: course.classID}

//     // console.log(input)

//     const res = await request(app)
//         .post('/student/add-to-course')
//         .send(input)
    
//     // console.log(student)

//     // const addToCourse = async (studentID, classID) => {
//     //     const student = await StudentService.find(studentID)
//     //     // console.log(student)
//     //     const course = await ClassService.find(classID)
//     //     student.schedule.push(course)
//     //     course.currentStudents.push(student.name)
//     //     // // console.log(student)
//     //     // const newStudent = student
//     //     // const newCourse = course
//     //     // await student.save();
//     //     // await course.save();
//     //     // await console.log(newStudent)
//     //     // return [newStudent, newCourse]
//     //     console.log([student, course])
//     //     return [student, course]
//     //     await student.save();
//     //     await course.save();
//     // }

//     // const addToCourse = async (studentID, classID) => {
//     //     const student = await StudentService.find(studentID)
//     //     const course = await ClassService.find(classID)
//     //     // console.log([student, course])
//     //     student.schedule.push(course)
//     //     course.currentStudents.push(student.name)
//     //     const newStudentSched = student.schedule
//     //     const newCourseStudents = course.currentStudents
//     //     // console.log([newStudentSched, newCourseStudents])
//     //     const newStudent = await edit(studentID, {schedule: newStudentSched})
//     //     const newCourse = await edit(classID, {currentStudents: newCourseStudents})
//     //     console.log([newStudent, newCourse])
//     //     return [newStudent, newCourse]
//     // }
//     // addToCourse(student.studentID, course.classID);

//     console.log(res.body)

//     t.is(res.status, 200)
//     // t.is(student.schedule.length, 1)
//     // t.is(course.currentStudents.includes('TestStudent'), true)
// })
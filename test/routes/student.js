import test from 'ava'
import request from 'supertest'
import app from '../../app'


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
    t.is(res.text, 'OK!')
})

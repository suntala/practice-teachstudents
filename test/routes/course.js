import test from 'ava'
import request from 'supertest'
import app from '../../app'


test('Delete a course', async t => {
    const input = {subject: 'Test', level: 1, capacity: 4, currentStudents: [], totalSessions: 5, startTime: 900, endTime: 1000, enrolling: false}

    const course = (await request(app)
        .post('/course/add')
        .send(input))
        .body

    const res = await request(app)
        .post('/course/del')
        .send({classID: course.classID})
    
    t.is(res.status, 200)
    t.is(res.text, 'OK!')
})

test('Add a course', async t => {
    const input = {subject: 'Test', level: 1, capacity: 4, currentStudents: [], totalSessions: 5}

    const res = await request(app)
        .post('/course/add')
        .send(input)
    
    t.is(res.status, 200)
    t.is(res.body.subject, input.subject)
    t.is(res.body.level, input.level)
    t.is(res.body.capacity, input.capacity)
    t.is(res.body.totalSessions, input.totalSessions)
    t.deepEqual(res.body.currentStudents, input.currentStudents)
})


test('Close enrolment', async t => {
    const input = {subject: 'Test', level: 1, capacity: 4, currentStudents: [], totalSessions: 5 , startTime: 900, endTime: 1000, enrolling: false}

    const course = (await request(app)
        .post('/course/add')
        .send(input))
        .body
    
    const res = await request(app)
        .post('/course/close-enrolment')

    function rightID(element) {
        return element.classID == course.classID
    }

    const newCourse = res.body.find(rightID);

    t.is(res.status, 200)
    t.is(newCourse.enrolling, true)
})


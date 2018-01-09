import test from 'ava'
import request from 'supertest'
import app from '../../app'

test('Add a course', async t => {
    const input = {subject: 'Test', level: 1, capacity: 4, currentStudents: [], totalSessions: 5}

    const res = await request(app)
        .post('/course/add')
        .send(input)

    // console.log(res.body)
    
    t.is(res.status, 200)
    t.is(res.body.subject, input.subject)
    t.is(res.body.level, input.level)
    t.is(res.body.capacity, input.capacity)
    t.is(res.body.totalSessions, input.totalSessions)
    t.deepEqual(res.body.currentStudents, input.currentStudents)
})
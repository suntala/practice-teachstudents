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

test('Close enrolment', async t => {
    const input = {subject: 'Test', level: 1, capacity: 4, currentStudents: [], totalSessions: 5 , startTime: 900, endTime: 1000, enrolling: false}

    const course = (await request(app)
        .post('/course/add')
        .send(input))
        .body
    
    // console.log(course)

    const res = await request(app)
        .post('/course/close-enrolment')

    // let testCourse; 
    // for (let i = 0; i < res.body.length; i++) {
    //     if (res.body[i].classID == course.courseID) {
    //         testCourse = res.body[i]
    //     }
    // }

    // console.log(testCourse)

    // const choice = res.body.find( x => (x.classId == 192) )

    // console.log(choice)
    // console.log(res.body[res.body.length-1])

    // console.log(res.body)

    function rightID(element) {
        // if (element.classID == courseID) {}
        return element.classID == course.classID
    }

    // console.log(res.body.find(rightID));
    const newCourse = res.body.find(rightID);


    t.is(res.status, 200)
    t.is(newCourse.enrolling, true)
    // t.is
})
import test from 'ava'
import request from 'supertest'
import app from '../../app'

test('Get student main page', async t => {
    const input = {name:'Test', money: 50, properties: []}

    const landlord = (await request(app)
        .post('/landlord/add')
        .send(input))
        .body  

    const res = await request(app)
        .get('/landlord')
    
    t.is(res.status, 200)
    t.regex(res.text, /Test/)
})
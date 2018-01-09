import test from 'ava'
import request from 'supertest'
import app from '../../app'

test('Get homepage', async t => {
    const res = await request(app)
        .get('/')
    
    t.is(res.status, 200)
    t.regex(res.text, /Index/)
})
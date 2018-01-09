const app = require('./app')
// app.listen(3000, () => {
//     console.log('Server listening.')
// })


/////////////////

const StudentModel = require('../models/student-model')   //change to whatever model name you have (2)
const ClassModel = require('../models/class-model')   
const ClassService = require('./class-service')
const StudentService = require('./student-service')

const main = async () => {
    await Database.writeTopics(topics);
    const speakWeeks = await Database.readWeeks();  
    console.log(speakTopics);

 };

 main();

 ////////////////////////
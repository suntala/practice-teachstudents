const fs = require('fs')
const StudentModel = require('../models/student-model')   //change to whatever model name you have (2)
const ClassModel = require('../models/class-model')   
const ClassService = require('./class-service')

const add = (student) => {
    return StudentModel.create(student)
}

const findAll = () => {
    return StudentModel.find()
}

const del = (studentID) => {
    return StudentModel.remove({ studentID })
}

const find = (studentID) => {
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

///////////

const checkForSubject = async (studentID, subject) => {
    const student = await find(studentID)
    // console.log(student)
    const takingClass = []
    for (let i = 0; i < student.schedule.length; i++) {
        if (student.schedule[i].subject == subject) {
            takingClass.push(subject)
        }
    }
    if (takingClass.length == 1) {
        return true
    }
    else {
        return false
    }
}

// const checkForSubject = async (studentID, subject) => {
//     const student = await find(studentID)
//     // console.log(student)
//     for (let i = 0; i < student.schedule.length; i++) {
//         if (student.schedule[i].subject == subject) {
//             return true
//         }
//         else {
//             return false
//         }
//     }
// }


const checkAvailableClasses = async (studentID, subject) => {
    const student = await find(studentID) 
    const courses = await ClassService.findAll()
    
    const eligible = []
    for (let j = 0; j < courses.length; j++) {
        if ((courses[j].level == student.level) && (courses[j].subject == subject)) {
            eligible.push(courses[j])
        }
    }

    if (student.schedule.length == 0) {
        return eligible
    }

    else {
        const busyTimes = []
        for (let i = 0; i < student.schedule.length; i++) {
            busyTimes.push([student.schedule[i].startTime, student.schedule[i].endTime])
        }
    
        const selection = []
        for (let k = 0; k < eligible.length; k++) {
            for (let b = 0; b < busyTimes.length; b++) {
                if (((busyTimes[b][0] < eligible[k].startTime < busyTimes[b][1]) || (busyTimes[b][0] < eligible[k].endTime < busyTimes[b][1])) == false) {
                    selection.push(eligible[k])
                }
            } 
        }
        return selection
    }
}
// if no busy time then eligible equals selection

const giveCourseOptions = async (studentID) => {
    const student = await find(studentID)
    const checkCS = await checkForSubject(studentID, "CS")
    const checkGerman = await checkForSubject(studentID, "German")

    let csSelection;
    // if (checkCS == false) {
    // if (true) {
    if (checkCS == false) {
        csSelection = {csClasses: await checkAvailableClasses(studentID, 'CS')}
    }
    else {
        csSelection = {csClasses: "Already enrolled."}
    }

    let germanSelection;
    if (checkGerman == false) {
         germanSelection = {germanClasses: await checkAvailableClasses(studentID, 'German')}
    }
    else {
        germanSelection = {germanClasses: "Already enrolled."}
   }

    // console.log([csSelection, germanSelection, germanSelection.germanClasses[0]])
    console.log([csSelection, germanSelection])
    return [csSelection, germanSelection]
    //check if student has CS and German
    //if not go through the courses and give options
} 
//correct this to make sure we get the right response for enrolment 
// --> have a response for no current classes created




//STU matching student with course (giving options to the student) 
//—> if course teaches the subject at the correct level then provide name as an option 
//schedule is like this: 


const addToCourse = async (studentID, classID) => {
    const student = await find(studentID)
    const course = await ClassService.find(classID)
    student.schedule.push(course)
    course.currentStudents.push(student.name)
    const newStudentSched = student.schedule
    const newCourseStudents = course.currentStudents
    // const newStudentSched = student.schedule.push(course)
    // const newCourseStudents = course.currentStudents.push(student.name)
    const newStudent = await edit(studentID, {schedule: newStudentSched})
    const newCourse = await ClassService.edit(classID, {currentStudents: newCourseStudents})
    // return [newStudent, newCourse]
    return [newStudent, newCourse]
}




// const addToCourse = async (studentID, classID) => {
//     const student = await find(studentID)
//     const course = await ClassService.find(classID)
//     student.schedule.push(course)
//     course.currentStudents.push(student.name)
//     // console.log([student, course])
//     return [student, course]
//     await student.save();
//     await course.save();
// }
//--> figure out about this!!!

// const addToCourse = async (studentID, classID) => {
//     const student = await find(studentID)
//     const course = await ClassService.find(classID)
//     student.schedule.push(course)
//     course.currentStudents.push(student.name)
//     const newStudent = await student.save();
//     const newCourse = await course.save();
//     return [newStudent, newCourse]
// }


// const addToCourse = async (studentID, classID) => {
//     const student = await StudentService.find(studentID)
//     // console.log(student)
//     const course = await ClassService.find(classID)
//     student.schedule.push(course)
//     course.currentStudents.push(student.name)
//     // console.log(student)
//     const newStudent = await student.save();
//     const newCourse = await course.save();
//     console.log(student)
//     return [newStudent, newCourse]
// }  --> strange console.log after saving the student doesn't work!

module.exports = {
    findAll,
    add,
    del,
    find,
    edit,
    checkAvailableClasses,
    checkForSubject,
    giveCourseOptions,
    addToCourse
}
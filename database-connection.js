const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/teachstudents')   //change prac to whatever name is appropriate



//maybe remove , { useMongoClient: true }
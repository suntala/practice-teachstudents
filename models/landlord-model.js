const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)


const LandlordSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean
    },
    properties: []
})


LandlordSchema.plugin(AutoIncrement, { inc_field: 'id' })  //change to whatever the model is called (helps to give it special name instead of just id) (1)
module.exports = mongoose.model('Landlord', LandlordSchema)  //change to whatever the model is called (2)
var mongoose = require("mongoose");
var userregistrations =  new mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    email: { type: String, unique: true, validate: {
        message: 'Please provide a valid email id',
        validator: (value) => true
    }},
    phone: { type: Number,},
    username: { type: String, },
    role: { type: String, },
    userpass: { type: String, },
    isActive: { type: String, },
    dob: { type: String, },
    regDate: { type: String,},
    demographics: {
        height: {type:String},
        weight: {type:String},
        age: {type:Number},
        bloodPressure: {type:String},
        pluseRate: {type:String},
        ethnicity: {type:String},
        education: {type:String},
        employment: {type:String},
        address: {type:String},
        phoneNo: {type:Number},
        medHistory: {type:String},
        surgeries: {type:String},
        familyMedHistory: {type:String},
        provider: {type:String},
        gender: {type:String},
    },
    sceduledAppointments: {type: Array},
    immunization: {type: Array},
    allergies: {type: Array},
    currentMedications: {type: Array},

});

module.exports = mongoose.model('userregistrations', userregistrations);

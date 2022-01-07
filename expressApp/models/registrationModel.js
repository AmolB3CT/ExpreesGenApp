var mongoose = require("mongoose");
const demographics = require("./demographics");
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
    demographics: {type: demographics},
    sceduledAppointments: {type: Array},
    immunization: {type: Array},
    allergies: {type: Array},
    currentMedications: {type: Array},

});

module.exports = mongoose.model('userregistrations', userregistrations);

const mongoose = require("mongoose");

const demographics = new  mongoose.Schema({
    height: {type:String},
    weight: {type:String},
    age: {type:String},
    bloodPressure: {type:String},
    pluseRate: {type:String},
    ethnicity: {type:String},
    education: {type:String},
    employment: {type:String},
    address: {type:String},
    phoneNo: {type:String},
    medHistory: {type:String},
    surgeries: {type:String},
    familyMedHistory: {type:String},
    provider: {type:String},
    gender: {type:String},
    username: {type:String},
    dob: {type:String},
    notes: {type:String},
    schedule_time: {type:String},
    type: {type:String},

});

module.exports.demographics = demographics;
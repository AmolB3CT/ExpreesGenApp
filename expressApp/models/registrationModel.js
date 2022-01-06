var mongoose = require("mongoose");
// const demographcs = require("./demographics");
var userregistrations =  new mongoose.Schema({
    firstName: {type: String,required : true},
    lastName: {type: String,required : true},
    email: { type: String, required: true, unique: true, validate: {
        message: 'Please provide a valid email id',
        validator: (value) => true
    }},
    phone: { type: Number, required: true},
    userName: { type: String, required: true },
    role: { type: String, required: true },
    userpass: { type: String, required: true },
    // isActive: { type: String, required: true },
    dob: { type: String, required: true },
});

module.exports = mongoose.model('userregistrations', userregistrations);

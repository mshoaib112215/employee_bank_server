const mongoose = require('mongoose');

const userType = ['admin', 'HR', 'employee'];
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: { type: String, enum: userType,  required: true } // 1. admin 2. HR 3. employee
},
    {timestamps: true}
);

module.exports = mongoose.model('User', userSchema, 'users');
const mongoose = require('mongoose');

const { Schema } = mongoose;
const genderEnum = ['Male', 'Female', 'Others']

const employeeModel = new Schema({
    // applied_for: {type: mongoose.Schema.Types.ObjectId, ref: 'AppliedFor', required: true},
    email: { type: String, required: true},
    applied_for: { type: String, required: true},
    name: {type: String, required: true},
    gender: { type: String,enum: genderEnum, required: true },
    phone: { type: Number, required: true },
    cnic: { type: Number, required: true},
    applied_date: { type: Date, required: true },
    city: { type: String, required: true },
    // type: { type: mongoose.Schema.Types.ObjectId, ref: 'EmployeeType'}, // intern/Permanent/Student
    type: { type: String, required: true }, // intern/Permanent/Student
    status: {type: String, required: true},
    remarks: {type: String},
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},
    { timestamps: true }
);
employeeModel.index({ applied_for: 1 }, { unique: false });
employeeModel.index({ email: 1 }, { unique: false });

module.exports = mongoose.model('Employee_Model', employeeModel, 'employeeModel');
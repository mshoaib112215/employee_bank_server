const mongoose = require('mongoose');
const { Schema } = mongoose;

const employee_type = new Schema({
    value: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('EmployeeType', employee_type, 'employeetype');

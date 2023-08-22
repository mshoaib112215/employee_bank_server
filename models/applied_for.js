const mongoose = require('mongoose');
const { Schema } = mongoose;

const appliedForSchema = new Schema({
    value: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('AppliedFor', appliedForSchema, 'appliedFor');

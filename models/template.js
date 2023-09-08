const mongoose = require('mongoose');
const { Schema } = mongoose;

const template = new Schema({
    value: { type: String, required: true, unique: true },
    description: {type: String, required: true}
});

module.exports = mongoose.model('Template', template, 'template');

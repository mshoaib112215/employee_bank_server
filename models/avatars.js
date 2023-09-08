const mongoose = require('mongoose');
const { Schema } = mongoose;

const avatars = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Avatars', avatars, 'avatars');

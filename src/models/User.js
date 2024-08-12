const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tel_number: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher'], required: true },
    group: { type: String, required: function () { return this.role === 'student'; } },
    channelName: { type: String, required: function () { return this.role === 'teacher'; } },
    streamKey: { type: String, required: function () { return this.role === 'teacher'; } },
    userName: { type: String, required: function () { return this.role === 'teacher'; } }
});

module.exports = mongoose.model('User', userSchema);
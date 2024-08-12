const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
    streamTitle: { type: String, required: true },
    description: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    group: { type: String, required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teacherName: { type: String, required: true },
    status: {
        type: String,
        enum: ['ended', 'planned', 'live'],
        default: 'planned'
    }
});

streamSchema.methods.updateStatus = function () {
    const now = new Date();
    if (now < this.startTime) {
        this.status = 'planned';
    } else if (now >= this.startTime && now <= this.endTime) {
        this.status = 'live';
    } else {
        this.status = 'ended';
    }
};

module.exports = mongoose.model('Stream', streamSchema);
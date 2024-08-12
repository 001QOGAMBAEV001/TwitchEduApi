const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['rating', 'stream'], required: true },
    content: {
        teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        group: { type: String },
        rating: { type: Number },
        description: { type: String },
        date: { type: Date },
        streamTitle: { type: String },
        startTimeStream: { type: Date },
        channelName: { type: String },
        teacherName: { type: String }
    },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const notifications = await Notification.find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('content.teacher_id', 'name')
            .populate('content.student_id', 'name')
            .exec();

        const count = await Notification.countDocuments({ userId: req.user.id });

        res.json({
            notifications,
            totalCount: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server xatosi' });
    }
};

exports.markNotificationAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({ message: 'Xabarnoma topilmadi' });
        }

        if (notification.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Ruxsat etilmagan' });
        }

        notification.isRead = true;
        await notification.save();

        res.json({
            message: `Xabarnoma o'qilgan deb belgilandi`,
      notification
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server xatosi' });
    }
};

// Yangi xabarnoma yaratish uchun funksiya (boshqa kontrollerlardan chaqiriladi)
exports.createNotification = async (userId, type, content) => {
    try {
        const newNotification = new Notification({
            userId,
            type,
            content
        });

        await newNotification.save();
        return newNotification;
    } catch (error) {
        console.error('Xabarnoma yaratishda xatolik:', error);
        throw error;
    }
};
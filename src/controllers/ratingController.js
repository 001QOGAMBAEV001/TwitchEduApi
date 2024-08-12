const Rating = require('../models/Rating');
const User = require('../models/User');

exports.rateStudent = async (req, res) => {
    try {
        const { studentId, rating, comment } = req.body;

        const student = await User.findById(studentId);
        if (!student || student.role !== 'student') {
            return res.status(404).json({ message: 'Talaba topilmadi' });
        }

        const newRating = new Rating({
            studentId,
            teacherId: req.user.id,
            rating,
            comment
        });

        await newRating.save();

        res.status(201).json({
            message: `Baho muvaffaqiyatli qo'yildi`,
      rating: newRating
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server xatosi' });
    }
};

exports.getGroupRatings = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const students = await User.find({ role: 'student', group: groupId });
        const studentIds = students.map(student => student._id);

        const ratings = await Rating.find({ studentId: { $in: studentIds } })
            .populate('studentId', 'name')
            .populate('teacherId', 'name')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Rating.countDocuments({ studentId: { $in: studentIds } });

        res.json({
            ratings,
            totalCount: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server xatosi' });
    }
};

exports.getStudentRatings = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const ratings = await Rating.find({ studentId })
            .populate('teacherId', 'name')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Rating.countDocuments({ studentId });

        res.json({
            ratings,
            totalCount: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server xatosi' });
    }
};
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerStudent = async (req, res) => {
    try {
        const { name, email, password, tel_number, group } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Foydalanuvchi allaqachon mavjud' });
        }

        user = new User({
            name,
            email,
            password,
            tel_number,
            group,
            role: 'student'
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(201).json({
            message: `Talaba muvaffaqiyatli ro'yxatdan o'tdi`,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                tel_number: user.tel_number,
                group: user.group,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server xatosi' });
    }
};

exports.registerTeacher = async (req, res) => {
    try {
        const { name, email, password, tel_number, channelName, streamKey, userName } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Foydalanuvchi allaqachon mavjud' });
        }

        user = new User({
            name,
            email,
            password,
            tel_number,
            channelName,
            streamKey,
            userName,
            role: 'teacher'
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(201).json({
            message: `O'qituvchi muvaffaqiyatli ro'yxatdan o'tdi`,
      user: {
            id: user.id,
            name: user.name,
            email: user.email,
            tel_number: user.tel_number,
            channelName: user.channelName,
            userName: user.userName,
            role: user.role
        }
    });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server xatosi' });
}
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: `Noto'g'ri email yoki parol` });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: `Noto'g'ri email yoki parol` });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        const responseUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            tel_number: user.tel_number,
            role: user.role,
            group: user.group,
            channelName: user.channelName,
            userName: user.userName
        };

        if (user.role === 'teacher') {
            responseUser.streamKey = user.streamKey;
        }

        res.json({
            message: 'Muvaffaqiyatli kirildi',
            token,
            user: responseUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server xatosi' });
    }
};
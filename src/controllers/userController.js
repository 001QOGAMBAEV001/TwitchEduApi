const User = require('../models/User');

exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server xatosi' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, email, tel_number, group, channelName } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (tel_number) user.tel_number = tel_number;
        if (group && user.role === 'student') user.group = group;
        if (channelName && user.role === 'teacher') user.channelName = channelName;

        await user.save();

        res.json({
            message: `Foydalanuvchi ma'lumotlari yangilandi`,
      user: {
            id: user.id,
            name: user.name,
            email: user.email,
            tel_number: user.tel_number,
            role: user.role,
            group: user.group,
            channelName: user.channelName
        }
    });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server xatosi' });
}
};
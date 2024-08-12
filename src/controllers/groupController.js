const Group = require('../models/Group');

exports.getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.json(groups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server xatosi' });
    }
};

exports.createGroup = async (req, res) => {
    try {
        const { name } = req.body;

        const group = new Group({ name });
        await group.save();

        res.status(201).json({
            message: 'Guruh muvaffaqiyatli yaratildi',
            group
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server xatosi' });
    }
};

exports.updateGroup = async (req, res) => {
    try {
        const { name } = req.body;

        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Guruh topilmadi' });
        }

        group.name = name;
        await group.save();

        res.json({
            message: 'Guruh muvaffaqiyatli yangilandi',
            group
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server xatosi' });
    }
};

exports.deleteGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Guruh topilmadi' });
        }

        await group.remove();

        res.json({
            message: `Guruh muvaffaqiyatli o'chirildi` });
  } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server xatosi' });
        }
    };
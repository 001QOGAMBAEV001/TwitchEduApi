const Stream = require('../models/Stream');

exports.createStream = async (req, res) => {
    try {
        const { streamTitle, description, startTime, endTime, group } = req.body;

        const stream = new Stream({
            streamTitle,
            description,
            startTime,
            endTime,
            group,
            teacherId: req.user.id,
            teacherName: req.user.name
        });

        stream.updateStatus();
        await stream.save();

        res.status(201).json({
            message: 'Translyatsiya muvaffaqiyatli yaratildi',
            stream
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server xatosi' });
    }
};

exports.getAllStreams = async (req, res) => {
    try {
        const { page = 1, limit = 10, group, status } = req.query;

        const query = {};
        if (group) query.group = group;
        if (status) query.status = status;

        const streams = await Stream.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        streams.forEach(stream => stream.updateStatus());
        await Promise.all(streams.map(stream => stream.save()));

        const count = await Stream.countDocuments(query);

        res.json({
            streams,
            totalCount: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server xatosi' });
    }
};

exports.getStream = async (req, res) => {
    try {
        const stream = await Stream.findById(req.params.id);
        if (!stream) {
            return res.status(404).json({ message: 'Translyatsiya topilmadi' });
        }
        stream.updateStatus();
        await stream.save();
        res.json(stream);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server xatosi' });
    }
};

exports.updateStream = async (req, res) => {
    try {
        const { streamTitle, description, startTime, endTime, group } = req.body;

        const stream = await Stream.findById(req.params.id);
        if (!stream) {
            return res.status(404).json({ message: 'Translyatsiya topilmadi' });
        }

        if (stream.teacherId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Ruxsat etilmagan' });
        }

        if (streamTitle) stream.streamTitle = streamTitle;
        if (description) stream.description = description;
        if (startTime) stream.startTime = startTime;
        if (endTime) stream.endTime = endTime;
        if (group) stream.group = group;

        stream.updateStatus();
        await stream.save();

        res.json({
            message: 'Translyatsiya muvaffaqiyatli yangilandi',
            stream
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server xatosi' });
    }
};

exports.deleteStream = async (req, res) => {
    try {
        const stream = await Stream.findById(req.params.id);
        if (!stream) {
            return res.status(404).json({ message: 'Translyatsiya topilmadi' });
        }

        if (stream.teacherId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Ruxsat etilmagan' });
        }

        await stream.remove();

        res.json({
            message: `Translyatsiya muvaffaqiyatli o'chirildi` });
  } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server xatosi' });
        }
    };

    // Yangi funksiya: O'qituvchining barcha translyatsiyalarini olish
    exports.getTeacherStreams = async (req, res) => {
        try {
            const { page = 1, limit = 10, status } = req.query;

            const query = { teacherId: req.user.id };
            if (status) query.status = status;

            const streams = await Stream.find(query)
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            streams.forEach(stream => stream.updateStatus());
            await Promise.all(streams.map(stream => stream.save()));

            const count = await Stream.countDocuments(query);

            res.json({
                streams,
                totalCount: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit)
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server xatosi' });
        }
    };
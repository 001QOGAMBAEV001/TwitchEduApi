const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        message: 'Server xatosi',
        error: process.env.NODE_ENV === 'production' ? {} : err
    });
};

module.exports = errorHandler;
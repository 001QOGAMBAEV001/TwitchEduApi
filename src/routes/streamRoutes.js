const express = require('express');
const router = express.Router();
const { createStream, getAllStreams, getStream, updateStream, deleteStream, getTeacherStreams } = require('../controllers/streamController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, createStream);
router.get('/', auth, getAllStreams);
router.get('/teacher', auth, getTeacherStreams);
router.get('/:id', auth, getStream);
router.put('/:id', auth, updateStream);
router.delete('/:id', auth, deleteStream);

module.exports = router;
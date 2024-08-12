const express = require('express');
const router = express.Router();
const { getNotifications, markNotificationAsRead } = require('../controllers/notificationController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, getNotifications);
router.put('/:id/read', auth, markNotificationAsRead);

module.exports = router;
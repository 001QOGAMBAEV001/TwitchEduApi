const express = require('express');
const router = express.Router();
const { getCurrentUser, updateUser } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

router.get('/me', auth, getCurrentUser);
router.put('/me', auth, updateUser);

module.exports = router;
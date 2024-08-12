const express = require('express');
const router = express.Router();
const { rateStudent, getGroupRatings, getStudentRatings } = require('../controllers/ratingController');
const auth = require('../middlewares/authMiddleware');

router.post('/student/:studentId', auth, rateStudent);
router.get('/group/:groupId', auth, getGroupRatings);
router.get('/student/:studentId', auth, getStudentRatings);

module.exports = router;
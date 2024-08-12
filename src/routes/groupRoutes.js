const express = require('express');
const router = express.Router();
const { getAllGroups, createGroup, updateGroup, deleteGroup } = require('../controllers/groupController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, getAllGroups);
router.post('/', auth, createGroup);
router.put('/:id', auth, updateGroup);
router.delete('/:id', auth, deleteGroup);

module.exports = router;
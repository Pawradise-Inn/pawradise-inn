const express = require('express');
const {register, getMe, updateMe, deleteMe, login, logout} = require('../controllers/auth');
const {protect} = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);

router.route('/:id')
    .get(getMe)
    .put(updateMe)
    .delete(deleteMe);

module.exports = router;

const express = require('express');
const {register, getMe, updateMe, deleteMe, login, logout} = require('../controllers/auth');
const {protect} = require('../middleware/auth');

const router = express.Router();

router.get('/me', protect, getMe);      // no :id, user id comes from token
router.put('/me', protect, updateMe);   // update logged-in user
router.delete('/me', protect, deleteMe);// delete logged-in user

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);

module.exports = router;

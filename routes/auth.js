const express = require('express');
const {register, getMe, logout} = require('../controllers/auth');
const {protect} = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.get("/:id", getMe);
router.post('/logout', protect, logout);

module.exports = router;

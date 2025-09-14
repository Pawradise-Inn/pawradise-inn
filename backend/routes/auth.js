const express = require('express');
const {register, getMe, updateMe, deleteMe} = require('../controllers/auth');
const {protect} = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);

router.route('/:id')
    .get(getMe)
    .put(updateMe)
    .delete(deleteMe);

module.exports = router;

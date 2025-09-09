const express = require('express');
const {register, getMe, updateMe, deleteMe} = require('../controllers/auth');
const {protect} = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.get("/:id", getMe);
router.put("/:id", updateMe);
router.delete("/:id", deleteMe);

module.exports = router;

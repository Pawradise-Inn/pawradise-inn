const express = require('express');
const router = express.Router();

const {
    getChatLogs,
    getChatLogById,
    createChatLog,
    replyToChatLog,
    deleteChatLog
} = require('../controllers/chatlog');

const {protect, authorize} = require('../middleware/auth');

router.route('/')
    .get(getChatLogs)
    .post(protect, authorize("CUSTOMER"), createChatLog);

router.route('/:id')
    .get(getChatLogById)
    .patch(protect, authorize("STAFF"), replyToChatLog)
    .delete(protect, authorize("STAFF", "CUSTOMER"), deleteChatLog);

module.exports = router;
const express = require('express');
const router = express.Router();

const {
    getChatLogs,
    getChatLog,
    createChatLog,
    replyToChatLog,
    deleteChatLog,
    updateChatLog
} = require('../controllers/chatlog');

const {protect, authorize} = require('../middleware/auth');

router.route('/')
    .get(getChatLogs)
    .post(protect, authorize("CUSTOMER"), createChatLog);

router.route('/:id')
    .get(getChatLog)
    .post(protect, authorize("STAFF"), replyToChatLog)
    .patch(protect, authorize("STAFF", "CUSTOMER"), updateChatLog)
    .delete(protect, authorize("STAFF", "CUSTOMER"), deleteChatLog);

module.exports = router;
const express = require('express');
const router = express.Router();

const {
    getChatLogs,
    getChatLogById,
    createChatLog,
    replyToChatLog,
    deleteChatLog
} = require('../controllers/chatlog');

router.route('/')
    .get(getChatLogs)
    .post(createChatLog);

router.route('/:id')
    .get(getChatLogById)
    .post(replyToChatLog)
    .delete(deleteChatLog);

module.exports = router;
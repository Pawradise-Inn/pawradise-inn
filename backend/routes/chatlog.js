const express = require('express');
const router = express.Router({ mergeParams: true });

const {
    getChatLogs,
    getChatLog,
    createChatLog,
    replyToChatLog,
    deleteChatLog,
    updateChatLog,
    getMyreviews
} = require('../controllers/chatlog');

const {protect, authorize} = require('../middleware/auth');

router.route('/mine')
    .get(protect, authorize("STAFF", "CUSTOMER"), getMyreviews);

router.route('/')
    .get(getChatLogs)
    .post(protect, authorize("CUSTOMER"), createChatLog);

router.route('/:id')
    .get(getChatLog)
    .post(protect, authorize("STAFF"), replyToChatLog)
    .patch(protect, authorize("STAFF", "CUSTOMER"), updateChatLog)
    .delete(protect, authorize("STAFF", "CUSTOMER"), deleteChatLog);

module.exports = router;
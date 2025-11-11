const express = require('express');
const router = express.Router({ mergeParams: true });

const {
    getChatLogs,
    getChatLog,
    createChatLog,
    replyToChatLog,
    deleteChatLog,
    updateChatLog,
    getMyreviews,
    getToBeReview
} = require('../controllers/chatlog');

const {protect, authorize} = require('../middleware/auth');

router.route('/mine/waiting')
    .get(protect, authorize("CUSTOMER"), getToBeReview);

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

/** 
 * @swagger
 * tags:
 *   name: ChatLogs
 *   description: Chat logs and reviews management API
 */

/** 
 * @swagger
 * /chatlogs/mine/waiting:
 *   get:
 *     summary: Get reviews waiting to be written by current user
 *     tags: [ChatLogs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending reviews
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /chatlogs/mine:
 *   get:
 *     summary: Get current user's reviews
 *     tags: [ChatLogs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's reviews
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /chatlogs:
 *   get:
 *     summary: Get all chat logs
 *     tags: [ChatLogs]
 *     responses:
 *       200:
 *         description: List of all chat logs
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new chat log/review
 *     tags: [ChatLogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Chat log created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /chatlogs/{id}:
 *   get:
 *     summary: Get chat log by ID
 *     tags: [ChatLogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The chat log ID
 *     responses:
 *       200:
 *         description: Chat log details
 *       404:
 *         description: Chat log not found
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Reply to a chat log
 *     tags: [ChatLogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The chat log ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Reply added successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Chat log not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update chat log
 *     tags: [ChatLogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The chat log ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Chat log updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Chat log not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete chat log
 *     tags: [ChatLogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The chat log ID
 *     responses:
 *       200:
 *         description: Chat log deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Chat log not found
 *       500:
 *         description: Internal server error
 */
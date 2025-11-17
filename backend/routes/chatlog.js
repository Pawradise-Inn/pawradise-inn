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
 *     description: Returns rooms and services that have been completed but not yet reviewed by the customer
 *     tags: [ChatLogs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Items waiting for review loaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "LOADED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Items to review loaded"
 *                 data:
 *                   type: object
 *                   properties:
 *                     rooms:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           pic:
 *                             type: string
 *                             example: "https://example.com/room.jpg"
 *                           roomName:
 *                             type: string
 *                             example: "Deluxe Suite"
 *                           petName:
 *                             type: string
 *                             example: "Buddy"
 *                           date:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-11-15T10:00:00.000Z"
 *                           staffName:
 *                             type: string
 *                             example: "John Doe"
 *                     services:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 2
 *                           pic:
 *                             type: string
 *                             example: "https://example.com/service.jpg"
 *                           serviceName:
 *                             type: string
 *                             example: "Grooming"
 *                           petName:
 *                             type: string
 *                             example: "Buddy"
 *                           date:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-11-15T14:00:00.000Z"
 *                           staffName:
 *                             type: string
 *                             example: "Jane Smith"
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_LOAD"
 *                 message:
 *                   type: string
 *                   example: "Unable to load items waiting for review. Please refresh and try again"
 */

/** 
 * @swagger
 * /chatlogs/mine:
 *   get:
 *     summary: Get current user's reviews
 *     description: Returns all reviews created by the authenticated user, sorted by reading status and date
 *     tags: [ChatLogs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's reviews loaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "LOADED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Your reviews loaded"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       image:
 *                         type: string
 *                         example: "https://example.com/room.jpg"
 *                       name:
 *                         type: string
 *                         description: Service name or room ID
 *                         example: "Grooming"
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-15T10:00:00.000Z"
 *                       nameOfStaffReply:
 *                         type: string
 *                         nullable: true
 *                         example: "John Doe"
 *                       readingStatus:
 *                         type: boolean
 *                         description: Whether the customer has read the staff reply
 *                         example: false
 *                       type:
 *                         type: string
 *                         enum: ["service", "room"]
 *                         example: "service"
 *                       rating:
 *                         type: number
 *                         nullable: true
 *                         example: 4.5
 *                       userReview:
 *                         type: string
 *                         nullable: true
 *                         example: "Great service!"
 *                       reply:
 *                         type: string
 *                         nullable: true
 *                         example: "Thank you for your feedback!"
 *                       review:
 *                         type: string
 *                         nullable: true
 *                         example: "Great service!"
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_LOAD"
 *                 message:
 *                   type: string
 *                   example: "Unable to load your reviews. Please refresh and try again"
 */

/** 
 * @swagger
 * /chatlogs:
 *   get:
 *     summary: Get all chat logs/reviews
 *     description: Returns paginated list of reviews with filtering, sorting, and search capabilities
 *     tags: [ChatLogs]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: JSON string for filtering (e.g., {"rating":5,"search":"grooming","review_date":"2025-11-15"})
 *         example: '{"rating":5}'
 *       - in: query
 *         name: select
 *         schema:
 *           type: string
 *         description: Comma-separated list of fields to select
 *         example: "id,rating,review"
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Comma-separated list of fields with optional direction (field:asc or field:desc)
 *         example: "rating:desc,review_date:asc"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 3
 *         description: Number of items per page
 *         example: 10
 *     responses:
 *       200:
 *         description: Reviews loaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "LOADED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Reviews loaded"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       commenter_name:
 *                         type: string
 *                         example: "John Doe"
 *                       commenter_detail:
 *                         type: string
 *                         example: "Excellent service!"
 *                       commenter_star:
 *                         type: number
 *                         example: 5
 *                       serviceName:
 *                         type: string
 *                         nullable: true
 *                         example: "Grooming"
 *                       reviewDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-15T10:00:00.000Z"
 *                       roomName:
 *                         type: string
 *                         nullable: true
 *                         example: "Deluxe Suite"
 *                       roomImg:
 *                         type: string
 *                         nullable: true
 *                         example: "https://example.com/room.jpg"
 *                       serviceImg:
 *                         type: string
 *                         nullable: true
 *                         example: "https://example.com/service.jpg"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     next:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                           example: 2
 *                         limit:
 *                           type: integer
 *                           example: 10
 *                     prev:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 10
 *                 count:
 *                   type: integer
 *                   example: 25
 *       404:
 *         description: No reviews found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "NO_REVIEWS_FOUND"
 *                 message:
 *                   type: string
 *                   example: "No reviews found matching your criteria"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_LOAD"
 *                 message:
 *                   type: string
 *                   example: "Unable to load reviews. Please refresh and try again"
 *   post:
 *     summary: Create a new chat log/review
 *     description: Submit a review for a service or room. Customer can only review each service/room once.
 *     tags: [ChatLogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - review
 *             properties:
 *               rating:
 *                 type: number
 *                 description: Rating from 0 to 5
 *                 example: 4.5
 *               review:
 *                 type: string
 *                 description: Review text
 *                 example: "Great service, very professional!"
 *               serviceId:
 *                 type: integer
 *                 description: ID of the service being reviewed (required if roomId not provided)
 *                 example: 1
 *               roomId:
 *                 type: integer
 *                 description: ID of the room being reviewed (required if serviceId not provided)
 *                 example: 2
 *     responses:
 *       201:
 *         description: Review submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "REVIEW_SUBMITTED"
 *                 message:
 *                   type: string
 *                   example: "Thank you for your review"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     image:
 *                       type: string
 *                       example: "https://example.com/service.jpg"
 *                     name:
 *                       type: string
 *                       example: "Grooming"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-15T10:00:00.000Z"
 *                     nameOfStaffReply:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     readingStatus:
 *                       type: boolean
 *                       example: true
 *                     type:
 *                       type: string
 *                       enum: ["service", "room"]
 *                       example: "service"
 *                     rating:
 *                       type: number
 *                       example: 4.5
 *                     userReview:
 *                       type: string
 *                       example: "Great service, very professional!"
 *                     reply:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     review:
 *                       type: string
 *                       example: "Great service, very professional!"
 *       400:
 *         description: Bad request - Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "MISSING_FIELDS"
 *                 message:
 *                   type: string
 *                   example: "Please select a service or room to review"
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       409:
 *         description: Conflict - Duplicate review
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "DUPLICATE_REVIEW"
 *                 message:
 *                   type: string
 *                   example: "You have already reviewed this service"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "SERVER_ERROR"
 *                 message:
 *                   type: string
 *                   example: "Unable to submit your review. Please try again"
 */

/** 
 * @swagger
 * /chatlogs/{id}:
 *   get:
 *     summary: Get chat log by ID
 *     description: Retrieve detailed information about a specific review/chat log
 *     tags: [ChatLogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The chat log ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Review details loaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "LOADED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Review details loaded"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     review:
 *                       type: string
 *                       nullable: true
 *                       example: "Great service!"
 *                     rating:
 *                       type: number
 *                       nullable: true
 *                       example: 4.5
 *                     reply:
 *                       type: string
 *                       nullable: true
 *                       example: "Thank you for your feedback!"
 *                     review_date:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-15T10:00:00.000Z"
 *                     reply_date:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *                       example: "2025-11-16T09:00:00.000Z"
 *                     isRead:
 *                       type: boolean
 *                       example: false
 *                     show:
 *                       type: boolean
 *                       example: true
 *                     customerId:
 *                       type: integer
 *                       example: 1
 *                     staffId:
 *                       type: integer
 *                       nullable: true
 *                       example: 2
 *                     serviceId:
 *                       type: integer
 *                       nullable: true
 *                       example: 1
 *                     roomId:
 *                       type: integer
 *                       nullable: true
 *                       example: null
 *       404:
 *         description: Review not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "REVIEW_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "This review could not be found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_LOAD"
 *                 message:
 *                   type: string
 *                   example: "Unable to load review details. Please try again"
 *   post:
 *     summary: Reply to a chat log/review
 *     description: Staff can reply to customer reviews
 *     tags: [ChatLogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The chat log ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reply
 *             properties:
 *               reply:
 *                 type: string
 *                 description: Staff reply message
 *                 example: "Thank you for your feedback! We're glad you enjoyed our service."
 *     responses:
 *       200:
 *         description: Reply posted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "REPLY_POSTED"
 *                 message:
 *                   type: string
 *                   example: "Your reply has been posted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     review:
 *                       type: string
 *                       example: "Great service!"
 *                     rating:
 *                       type: number
 *                       example: 4.5
 *                     reply:
 *                       type: string
 *                       example: "Thank you for your feedback! We're glad you enjoyed our service."
 *                     reply_date:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-16T09:00:00.000Z"
 *                     isRead:
 *                       type: boolean
 *                       example: false
 *                     staffId:
 *                       type: integer
 *                       example: 2
 *       400:
 *         description: Bad request - Missing reply message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "MISSING_FIELDS"
 *                 message:
 *                   type: string
 *                   example: "Please provide your reply message"
 *       401:
 *         description: Unauthorized - Staff authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "SERVER_ERROR"
 *                 message:
 *                   type: string
 *                   example: "Unable to post your reply. Please try again"
 *   patch:
 *     summary: Update chat log/review
 *     description: Customers can update their review, rating, or reading status. Staff can update reply or show status.
 *     tags: [ChatLogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The chat log ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               review:
 *                 type: string
 *                 description: Updated review text (customer only)
 *                 example: "Updated review text"
 *               rating:
 *                 type: number
 *                 description: Updated rating (customer only)
 *                 example: 5
 *               isRead:
 *                 type: boolean
 *                 description: Mark as read/unread (customer only)
 *                 example: true
 *               reply:
 *                 type: string
 *                 description: Updated reply text (staff only)
 *                 example: "Updated reply"
 *               show:
 *                 type: boolean
 *                 description: Show/hide review publicly (staff only)
 *                 example: true
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "UPDATED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Review updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     review:
 *                       type: string
 *                       example: "Updated review text"
 *                     rating:
 *                       type: number
 *                       example: 5
 *                     reply:
 *                       type: string
 *                       nullable: true
 *                       example: "Updated reply"
 *                     isRead:
 *                       type: boolean
 *                       example: true
 *                     show:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Bad request - No changes provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "MISSING_FIELDS"
 *                 message:
 *                   type: string
 *                   example: "No changes were provided to update"
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "SERVER_ERROR"
 *                 message:
 *                   type: string
 *                   example: "Unable to update review. Please try again"
 *   delete:
 *     summary: Delete chat log/review
 *     description: Delete a review. Available to both customers and staff.
 *     tags: [ChatLogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The chat log ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "DELETED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Review deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     review:
 *                       type: string
 *                       example: "Great service!"
 *                     rating:
 *                       type: number
 *                       example: 4.5
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       404:
 *         description: Review not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "REVIEW_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "This review no longer exists"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "SERVER_ERROR"
 *                 message:
 *                   type: string
 *                   example: "Unable to delete review. Please try again"
 */
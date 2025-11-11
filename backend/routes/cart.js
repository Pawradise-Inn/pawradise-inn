const express = require('express');
const router = express.Router();

const {
  getCart,
  addRoomToCart,
  addServiceToCart,
  deleteCartRoom,
  deleteCartService,
  toggleCartRoomSelection,
  toggleCartServiceSelection,
} = require('../controllers/cart');

const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getCart);

router.route('/rooms')
  .post(protect, authorize('CUSTOMER'), addRoomToCart);

router.route('/services')
  .post(protect, authorize('CUSTOMER'), addServiceToCart);

router.route('/rooms/:id')
  .delete(protect, authorize('CUSTOMER'), deleteCartRoom);

router.route('/services/:id')
  .delete(protect, authorize('CUSTOMER'), deleteCartService);

router.route('/rooms/:id/selected')
  .patch(protect, authorize('CUSTOMER'), toggleCartRoomSelection);

router.route('/services/:id/selected')
  .patch(protect, authorize('CUSTOMER'), toggleCartServiceSelection);

module.exports = router;

/** 
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart management API for room and service bookings
 */

/** 
 * @swagger
 * /cart:
 *   get:
 *     summary: Get current user's cart with all items
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart loaded successfully with rooms and services
 *       401:
 *         description: Unauthorized - please log in
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /cart/rooms:
 *   post:
 *     summary: Add a room booking to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomId
 *               - petId
 *               - checkIn
 *               - checkOut
 *             properties:
 *               roomId:
 *                 type: integer
 *                 example: 1
 *               petId:
 *                 type: integer
 *                 example: 5
 *               checkIn:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-15T14:00:00Z"
 *               checkOut:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-20T12:00:00Z"
 *     responses:
 *       201:
 *         description: Room added to cart successfully
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Room or pet not found
 *       409:
 *         description: Room not suitable for pet, room full, or duplicate booking
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /cart/services:
 *   post:
 *     summary: Add a service booking to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serviceId
 *               - petId
 *               - scheduled
 *             properties:
 *               serviceId:
 *                 type: integer
 *                 example: 3
 *               petId:
 *                 type: integer
 *                 example: 5
 *               scheduled:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-15T10:00:00Z"
 *     responses:
 *       201:
 *         description: Service added to cart successfully
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Service or pet not found
 *       409:
 *         description: Service not suitable, fully booked, duplicate, or pet not available
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /cart/rooms/{id}:
 *   delete:
 *     summary: Remove a room booking from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The cart room item ID
 *     responses:
 *       200:
 *         description: Room removed from cart successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /cart/services/{id}:
 *   delete:
 *     summary: Remove a service booking from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The cart service item ID
 *     responses:
 *       200:
 *         description: Service removed from cart successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /cart/rooms/{id}/selected:
 *   patch:
 *     summary: Toggle room selection status in cart (for checkout)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The cart room item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - selected
 *             properties:
 *               selected:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Selection updated successfully
 *       400:
 *         description: Missing or invalid 'selected' field
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /cart/services/{id}/selected:
 *   patch:
 *     summary: Toggle service selection status in cart (for checkout)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The cart service item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - selected
 *             properties:
 *               selected:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Selection updated successfully
 *       400:
 *         description: Missing or invalid 'selected' field
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Internal server error
 */



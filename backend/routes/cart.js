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



const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { makePayment, bookShow, getAllBooking } = require('../controllers/bookingController');

router.post('/make-payment',makePayment);
router.post('/book-show',bookShow);
router.get('/get-all-bookings',authMiddleware,getAllBooking);

module.exports = router;
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { addShow, getAllShowsByTheatre, deleteShow, getShowById } = require('../controllers/showController');
const router = express.Router();

router.post('/add-show',authMiddleware,addShow);
router.post('/get-all-shows-by-theatre',authMiddleware,getAllShowsByTheatre);
router.delete('/delete-show',authMiddleware,deleteShow);
router.post('/get-show-by-id',authMiddleware,getShowById);

module.exports = router;
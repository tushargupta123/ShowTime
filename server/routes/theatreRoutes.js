const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { addTheatre, getAllTheatresByOwner, getAllTheatres, updateTheatre, deleteTheatre, getAllTheatresByMovie } = require('../controllers/theatreController');
const router = express.Router();

router.post('/add-theatre',authMiddleware,addTheatre);
router.get('/get-all-theatres-by-owner',authMiddleware,getAllTheatresByOwner);
router.get('/get-all-theatres',authMiddleware,getAllTheatres);
router.put('/update-theatre',authMiddleware,updateTheatre);
router.delete('/delete-theatre',authMiddleware,deleteTheatre);
router.post('/get-all-theatres-by-movie',authMiddleware,getAllTheatresByMovie);

module.exports = router;
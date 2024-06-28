const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { addMovie, getAllMovies, updateMovie, deleteMovie, getAllTheatresByMovie, getMovieById } = require('../controllers/movieController');

router.post('/add-movie',authMiddleware,addMovie);
router.get('/get-all-movies',authMiddleware,getAllMovies);
router.put('/update-movie',authMiddleware,updateMovie);
router.delete('/delete-movie',authMiddleware,deleteMovie);
router.get('/get-movie-by-id/:movieId',authMiddleware,getMovieById);

module.exports = router;
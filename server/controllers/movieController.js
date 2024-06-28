const Show = require('../models/showModel');
const Movie = require('../models/movieModel');

const addMovie = async(req,res) => {
    try {
        await Movie.create(req.body);
        res.status(200).send({
            success: true,
            message: "Movie added successfully!",
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

const getAllMovies = async(req,res) => {
    try {
        const movie = await Movie.find();
        res.status(200).send({
            success: true,
            message: "Movie fetched successfully!",
            data: movie
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

const updateMovie = async(req,res) => {
    try {
        const {movieId, ...updateData} = req.body;
        await Movie.findByIdAndUpdate({_id:movieId},updateData);
        res.status(200).send({
            success: true,
            message: "Movie updated successfully!",
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

const deleteMovie = async(req,res) => {
    try {
        await Movie.findByIdAndDelete(req.query.movieId);
        res.status(200).send({
            success: true,
            message: "Movie deleted successfully!",
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

const getMovieById = async(req,res) => {
    try {
        const movie = await Movie.findById(req.params.movieId);
        if (movie) {
            res.status(200).send({
              success: true,
              message: "Movie Fetched Successfully",
              data: movie
            });
          } else {
            res.status(404).send({
              success: false,
              message: "Movie Not found"
            });
          }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

module.exports = {
    addMovie,
    getAllMovies,
    updateMovie,
    deleteMovie,
    getMovieById
}
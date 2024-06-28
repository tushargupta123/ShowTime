const Theatre = require('../models/theatreModel');
const Show = require('../models/showModel');

const addTheatre = async (req, res) => {
    try {
        await Theatre.create(req.body);
        res.status(200).send({
            success: true,
            message: "Theatre added successfully!",
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Something went wrong. Please try again after some time."
        });
    }
}

const getAllTheatresByOwner = async (req, res) => {
    try {
        const theatres = await Theatre.find({ owner: req.body.userId });
        res.status(200).send({
            success: true,
            message: "Theatres fetched successfully!",
            data: theatres,
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Something went wrong. Please, try again in sometime.",
        });
    }
}

const getAllTheatres = async (req, res) => {
    try {
        const theatres = await Theatre.find().populate({
            path: 'owner',
            select: '-password'
          });
        res.status(200).send({
            success: true,
            message: "Theatres fetched successfully!",
            data: theatres,
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Something went wrong. Please, try again in sometime.",
        });
    }
}

const updateTheatre = async(req,res) => {
    try {
        const { theatreId, ...updateData } = req.body;
        await Theatre.findOneAndUpdate({_id:theatreId},updateData);
        res.status(200).send({
            success: true,
            message: "Theatres updated successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message,
        });
    }
}

const deleteTheatre = async(req,res) => {
    try {
        await Theatre.findOneAndDelete(req.query.theatreId);
        res.status(200).send({
            success: true,
            message: "Theatres deleted successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message,
        });
    }
}

const getAllTheatresByMovie = async(req, res) => {
    try {
        const {movieId, date} = req.body;
        const shows = await Show.find({movie: movieId, date}).populate("theatre").sort({createdAt:-1});
        let uniqueTheatres = [];
        shows.forEach(show => {
            const theatre = uniqueTheatres.find(theatre => theatre._id === show.theatre._id);
            if(!theatre){
                const showsForThisTheatre = shows.filter(showObj => showObj.theatre._id == show.theatre._id);
                uniqueTheatres.push({
                    ...show.theatre._doc,
                    shows: showsForThisTheatre
                })
            }
        });
        res.status(200).send({
            success: true,
            message: "Theatres fetched successfully!",
            data: uniqueTheatres
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

module.exports = {
    addTheatre,
    getAllTheatresByOwner,
    getAllTheatres,
    updateTheatre,
    deleteTheatre,
    getAllTheatresByMovie
}
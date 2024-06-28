const Show = require('../models/showModel');

const addShow = async (req, res) => {
    try {
        await Show.create(req.body);
        res.status(200).send({
            success: true,
            message: "Show added successfully!",
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

const getAllShowsByTheatre = async(req,res) => {
    try {
        const shows = await Show.find({theatre: req.body.theatreId}).populate("movie");
        res.status(200).send({
            success: true,
            message: "Show fetched successfully!",
            data: shows
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

const deleteShow = async(req,res) => {
    try {
        await Show.findByIdAndDelete(req.query.showId);
        res.status(200).send({
            success: true,
            message: "Show deleted successfully!",
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

const getShowById = async(req, res) => {
    try {
        const show = await Show.findById(req.body.showId).populate("movie").populate("theatre");
        res.status(200).send({
            success: true,
            message: "Show fetched successfully!",
            data: show
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
    addShow,
    getAllShowsByTheatre,
    deleteShow,
    getShowById
}
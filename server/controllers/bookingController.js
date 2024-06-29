const Booking = require('../models/bookingModel');
const Show = require('../models/showModel');
const stripe = require("stripe")(process.env.stripe_key);

const makePayment = async (req, res) => {
    try {
        const { token, amount } = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "inr",
            customer: customer.id,
            payment_method_types: ["card"],
            receipt_email: token.email,
            description: "Token has been assigned to the movie!",
        });

        const transactionId = paymentIntent.id;

        res.send({
            success: true,
            message: "Payment Successful! Ticket(s) booked!",
            data: transactionId,
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
}

const bookShow = async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        const show = await Show.findById(req.body.show).populate("movie");
        const updateBookedSeats = [...show.bookedSeats, ...req.body.seats];
        await Show.findByIdAndUpdate(req.body.show, {
            bookedSeats: updateBookedSeats
        });
        res.status(200).send({
            success: true,
            message: "new Booking done!",
            data: booking
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

const getAllBooking = async (req, res) => {
    try {
        const booking = await Booking.find({ user: req.body.userId })
            .populate("user")
            .populate("show")
            .populate({
                path: "show",
                populate: {
                    path: "movie",
                    model: "movies",
                },
            })
            .populate({
                path: "show",
                populate: {
                    path: "theatre",
                    model: "theatres",
                },
            });
        res.status(200).send({
            success: true,
            message: "Booking fetched!",
            data: booking
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

module.exports = {
    makePayment,
    bookShow,
    getAllBooking
}
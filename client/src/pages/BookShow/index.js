import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { GetShowById } from "../../apicalls/shows";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import StripeCheckout from "react-stripe-checkout";
import Button from "../../components/Button.js";
import moment from "moment";
import { MakePayment, BookShowTickets, getAllBookings } from "../../apicalls/bookings.js";

function BookShow() {
    const { user } = useSelector((state) => state.users);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState({});
    const [selectedSeats, setSelectedSeats] = useState([]);

    const STRIPE_KEY = "pk_test_51NS13iSCXLoy346Z0F82nga3PmKQLdQeXOo75blXuf3c8RE74S37Gr51hE8qgo3rfojg6k2QAWFOS9D4nXOQnBml00yBHBP6aL";

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetShowById({
                showId: params.id,
            });
            if (response.success) {
                setShow(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const getSeats = () => {
        const columns = 10;
        const totalSeats = show.totalSeats;
        const rows = Math.ceil(totalSeats / columns);

        return (
            <div>
                <p className="m-4">Screen This Side</p>
                <hr />
                <div className="flex gap-1 flex-col p-2 card">
                    <hr />
                    {Array.from(Array(rows).keys()).map((seat, index) => {
                        return (
                            <div className="flex gap-1 justify-center" key={`${seat * columns + 1}_${index}`}>
                                {Array.from(Array(columns).keys()).map((column, index) => {
                                    const seatNumber = seat * columns + column + 1;
                                    let seatClass = "seat";

                                    if (selectedSeats.includes(seatNumber)) {
                                        seatClass = seatClass + " selected-seat";
                                    }

                                    if (show.bookedSeats.includes(seatNumber)) {
                                        seatClass = seatClass + " booked-seat";
                                    }

                                    return (
                                        seatNumber <= totalSeats && (
                                            <div
                                                key={index}
                                                className={seatClass}
                                                onClick={() => {
                                                    if (selectedSeats.includes(seatNumber)) {
                                                        setSelectedSeats(
                                                            selectedSeats.filter(
                                                                (item) => item !== seatNumber
                                                            )
                                                        );
                                                    } else {
                                                        setSelectedSeats([...selectedSeats, seatNumber]);
                                                    }
                                                }}
                                            >
                                                <h1 className="text-sm">{seatNumber}</h1>
                                            </div>
                                        )
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const book = async (transactionId = "") => {
        try {
            dispatch(ShowLoading());
            const response = await BookShowTickets({
                show: params.id,
                seats: selectedSeats,
                transactionId,
                user: user._id,
            });
            if (response.success) {
                message.success(response.message);
                await getAllBookings();
                navigate("/profile");
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            message.error(error.message);
            dispatch(HideLoading());
        }
    };


    const onToken = async (token) => {
        try {
            dispatch(ShowLoading());
            const response = await MakePayment(
                token,
                selectedSeats.length * show.ticketPrice * 100
            );
            if (response.success) {
                message.success(response.message);
                book(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            message.error(error.message);
            dispatch(HideLoading());
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        show?.movie?.title && (
            <div>

                <div className="flex justify-between card p-2 items-center">
                    <div>
                        <h1 className="text-sm">{show.theatre.name}</h1>
                        <h1 className="text-sm">{show.theatre.address}</h1>
                    </div>

                    <div>
                        <h1 className="text-2xl uppercase">
                            {show.movie.title} ({show.movie.language})
                        </h1>
                    </div>

                    <div>
                        <h1 className="text-sm">
                            {moment(show.date).format("MMM Do yyyy")} -{" "}
                            {moment(show.time, "HH:mm").format("hh:mm A")}
                        </h1>
                    </div>
                </div>

                <div className="flex justify-center mt-2">{getSeats()}</div>

                {selectedSeats.length > 0 && (
                    <div className="mt-2 flex justify-center gap-2 items-center flex-col">
                        <div className="flex justify-center">
                            <div className="flex uppercase card p-2 gap-3">
                                <h1 className="text-sm">
                                    <b>Selected Seats</b> : {selectedSeats.join(" , ")}
                                </h1>

                                <h1 className="text-sm">
                                    <b>Total Price</b> : Rs.{" "}
                                    {Math.ceil((selectedSeats.length * show.ticketPrice))}
                                </h1>
                            </div>
                        </div>
                        <StripeCheckout
                            billingAddress
                            token={onToken}
                            stripeKey={STRIPE_KEY}
                            currency='inr'
                            amount={selectedSeats.length * show.ticketPrice * 100}
                        >
                            <Button title="Pay to book" />
                        </StripeCheckout>
                    </div>
                )}
            </div>
        )
    );
}

export default BookShow;
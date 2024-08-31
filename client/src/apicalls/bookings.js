import { fetchInstance } from ".";

//make payment
export const MakePayment = async (token, amount) => {
  try {
    const response = await fetchInstance('POST',"/api/bookings/make-payment", {
      token,
      amount,
    });
    return response.json();
  } catch (error) {
    return error.response;
  }
};

export const BookShowTickets = async (payload) => {
    try {
      const response = await fetchInstance('POST',
        "/api/bookings/book-show",
        payload
      );
      return response.json();
    } catch (error) {
      return error.response;
    }
  };
  
  // get bookings of a user
  export const getAllBookings = async () => {
    try {
      const response = await fetchInstance('GET',"/api/bookings/get-all-bookings");
      return response.json();
    } catch (error) {
      return error.response;
    }
  };

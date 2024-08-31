import { fetchInstance } from ".";

export const AddTheatre = async (payload) => {
  try {
    const response = await fetchInstance('POST',
      "/api/theatre/add-theatre",
      payload
    );
    return response.json();
  } catch (err) {
    return err;
  }
};

export const GetAllTheatres = async () => {
  try {
    const response = await fetchInstance('GET',"/api/theatre/get-all-theatres");
    return response.json();
  } catch (err) {
    return err;
  }
};

export const GetAllTheatresByOwner = async () => {
  try {
    const response = await fetchInstance('GET',
      "/api/theatre/get-all-theatres-by-owner"
    );
    return response.json();
  } catch (err) {
    return err;
  }
};

export const UpdateTheatre = async (payload) => {
  try {
    const response = await fetchInstance('PUT',
      "/api/theatre/update-theatre",
      payload
    );
    return response.json();
  } catch (err) {
    return err;
  }
};

export const DeleteTheatre = async (theatreId) => {
  try {
    const response = await fetchInstance('DELETE',
      `/api/theatre/delete-theatre?theatreId=${theatreId}`
    );
    return response.json();
  } catch (err) {
    return err;
  }
};

export const GetAllTheatresByMovie = async (payload) => {
  try {
    const response = await fetchInstance('POST',
      "/api/theatre/get-all-theatres-by-movie",
      payload
    );
    return response.json();
  } catch (err) {
    return err.response;
  }
};
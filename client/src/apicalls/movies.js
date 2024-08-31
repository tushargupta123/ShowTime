import { fetchInstance } from ".";

// Create
export const AddMovie = async (payload) => {
  try {
    const response = await fetchInstance('POST',"/api/movie/add-movie", payload);
    return response.json();
  } catch (err) {
    return err;
  }
}

// Read
export const GetAllMovies = async () => {
  try {
    const response = await fetchInstance('GET',`/api/movie/get-all-movies`)
    return response.json();
  } catch (err) {
    return err;
  }
}

// Update
export const UpdateMovie = async (payload) => {
  try {
    const response = await fetchInstance('PUT',"/api/movie/update-movie", payload);
    return response.json();
  } catch (err) {
    return err;
  }
}

// Delete
export const DeleteMovie = async (movieId) => {
  try {
    const response = await fetchInstance('DELETE',`/api/movie/delete-movie?movieId=${movieId}`);
    return response.json();
  } catch (err) {
    return err;
  }
}

export const GetMovieById = async (movieId) => {
  try {
    const response = await fetchInstance('GET',`/api/movie/get-movie-by-id/${movieId}`);
    return response.json();
  } catch (err) {
    return err.response;
  }
};
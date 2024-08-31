import { fetchInstance } from ".";

export const AddShow = async (payload) => {
    try {
        const response = await fetchInstance('POST',"/api/show/add-show", payload);
        return response.json();
    } catch (err) {
        return err;
    }
};

export const GetAllShowsByTheatre = async (payload) => {
    try {
        const response = await fetchInstance('POST',
            "/api/show/get-all-shows-by-theatre",
            payload
        );
        return response.json();
    } catch (err) {
        return err;
    }
};

export const DeleteShow = async (showId) => {
    try {
        const response = await fetchInstance('DELETE',
            `/api/show/delete-show?showId=${showId}`
        );
        return response.json();
    } catch (err) {
        return err;
    }
};



export const GetShowById = async (payload) => {
    try {
        const response = await fetchInstance('POST',
            "/api/show/get-show-by-id",
            payload
        );
        return response.json();
    } catch (err) {
        return err.response;
    }
};
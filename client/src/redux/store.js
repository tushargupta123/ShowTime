import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import loaderSlice from "./loaderSlice";

const store = configureStore({
    reducer : {
        loaders : loaderSlice,
        users : userSlice
    }
});

export default store;
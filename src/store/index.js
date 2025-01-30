import { configureStore } from "@reduxjs/toolkit";
import placesReducer from "./slices/places-slice.js";
import progressBarReducer from "./slices/progressBar-slice.js";

const store = configureStore({
  reducer: {
    places: placesReducer,
    progressBar: progressBarReducer,
  }
});

export default store;
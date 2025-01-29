import { configureStore } from "@reduxjs/toolkit";
import placesReducer from "./places-slice.js";
import progressBarReducer from "./progressBar-slice.js";

const store = configureStore({
  reducer: {
    places: placesReducer,
    progressBar: progressBarReducer,
  }
});

export default store;
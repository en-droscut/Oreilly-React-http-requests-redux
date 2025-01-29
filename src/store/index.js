import { configureStore } from "@reduxjs/toolkit";
import placesReducer from "./places-slice.js";

const store = configureStore({
  reducer: {
    places: placesReducer,
  }
});

export default store;
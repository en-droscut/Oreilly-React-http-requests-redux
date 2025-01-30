import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: '',
  appError: '',
  isFetching: false,
  availablePlaces: '',
  userPlaces: [],
  errorUpdatingPlaces: '',
  modalIsOpen: false,
}

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setAppError(state, action) {
      state.appError = action.payload;
    },
    setIsFetching(state, action) {
      state.isFetching = action.payload;
    },
    setAvailablePlaces(state, action) {
      state.availablePlaces = action.payload;
    },
    setUserPlaces(state, action) {
      state.userPlaces = action.payload;
    },
    setErorrUpdatingPlaces(state, action) {
      state.errorUpdatingPlaces = action.payload;
    },
    setModalIsOpen(state, action) {
      state.modalIsOpen = action.payload;
    }
  }
});

export const placesActions = placesSlice.actions;
export default placesSlice.reducer;
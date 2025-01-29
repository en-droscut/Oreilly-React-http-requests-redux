import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: '',
  isFetching: false,
  availablePlaces: '',
}

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setIsFetching(state, action) {
      state.isFetching = action.payload;
    },
    setAvailablePlaces(state, action) {
      state.availablePlaces = action.payload;
    }
  }
});

export const placesActions = placesSlice.actions;
export default placesSlice.reducer;
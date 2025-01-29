import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  remainingTime: 30000,
}

const progressBarSlice = createSlice({
  name: 'progressBar',
  initialState,
  reducers: {
    setRemainingTime(state, action) {
      state.remainingTime = action.payload;
    }
  }
});

export const progressBarActions = progressBarSlice.actions;
export default progressBarSlice.reducer;
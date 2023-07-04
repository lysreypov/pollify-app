// Define state reducer
import CreatePollState from "../../types/redux/create_poll";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CreatePollState = {
  isCreatePollPopupOpen: false,
};

export const createPollSlice = createSlice({
  name: "CreatePollPopupAction",
  initialState: initialState,
  reducers: {
    openCreatePollPopup: (state) => {
      console.log("Open Create Poll Popup action dispatched");
      state.isCreatePollPopupOpen = true;
    },
    closeCreatePollPopup: (state) => {
      console.log("Close Create Poll Popup action dispatched");
      state.isCreatePollPopupOpen = false;
    },
  },
});

export const { openCreatePollPopup, closeCreatePollPopup } =
  createPollSlice.actions;

export default createPollSlice.reducer;

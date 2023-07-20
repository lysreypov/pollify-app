// Define state reducer
import CreatePollState, { Poll } from "../../types/redux/create_poll";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CreatePollState = {
  isCreatePollPopupOpen: false,
  polls: [],
  pollCommunityId: null,
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
    setPolls: (state, action: PayloadAction<Poll[]>) => {
      state.polls = action.payload;
    },
    setPollCommunityId: (state, action: PayloadAction<string | null>) => {
      state.pollCommunityId = action.payload;
    },
  },
});

export const {
  openCreatePollPopup,
  closeCreatePollPopup,
  setPolls,
  setPollCommunityId,
} = createPollSlice.actions;

export default createPollSlice.reducer;

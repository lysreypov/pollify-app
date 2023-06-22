// Define state reducer
import CommunityState, {
  UpdateCreateCommunityAction,
} from "../../types/redux/community";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CommunityState = {
  userProfile: null,
  isCreateCommunityOpen: false,
};

export const communitySlice = createSlice({
  name: UpdateCreateCommunityAction,
  initialState: initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<File | null>) => {
      state.userProfile = action.payload;
    },
    openCreateCommunity: (state) => {
      state.isCreateCommunityOpen = true;
    },
    closeCreateCommunity: (state) => {
      state.isCreateCommunityOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserProfile, openCreateCommunity, closeCreateCommunity } =
  communitySlice.actions;

export default communitySlice.reducer;

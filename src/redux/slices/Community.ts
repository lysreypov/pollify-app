// Define state reducer
import CommunityState, {
  UpdateCreateCommunityAction,
  User,
} from "../../types/redux/community";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CommunityState = {
  userProfile: null,
  communityName: "",
  searchTerm: "",
  communityDescription: "Description",
  isCreateCommunityOpen: false,
  userData: [],
  invitedUsers: [],
};

export const communitySlice = createSlice({
  name: UpdateCreateCommunityAction,
  initialState: initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<File | null>) => {
      state.userProfile = action.payload;
    },
    setCommunityName: (state, action: PayloadAction<string>) => {
      state.communityName = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    openCreateCommunity: (state) => {
      state.isCreateCommunityOpen = true;
    },
    closeCreateCommunity: (state) => {
      state.isCreateCommunityOpen = false;
    },
    setUserData: (state, action: PayloadAction<User[]>) => {
      state.userData = action.payload;
    },
    setInvitedUsers: (state, action: PayloadAction<User[]>) => {
      state.invitedUsers = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserProfile,
  setCommunityName,
  setSearchTerm,
  openCreateCommunity,
  closeCreateCommunity,
  setUserData,
  setInvitedUsers,
} = communitySlice.actions;

export default communitySlice.reducer;

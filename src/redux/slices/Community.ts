// Define state reducer
import CommunityState, {
  UpdateCommunityAction,
  User,
} from "../../types/redux/community";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CommunityState = {
  userProfile: null,
  inCommunityId: 0,
  userCommunity: 0,
  pollInCommunity: 0,
  communityName: "",
  searchTerm: "",
  communityDescription: "Description",
  isCreateCommunityOpen: false,
  userData: [],
  invitedUsers: [],
};

export const communitySlice = createSlice({
  name: UpdateCommunityAction,
  initialState: initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<File | null>) => {
      state.userProfile = action.payload;
    },
    setInCommunityId: (state, action: PayloadAction<number>) => {
      state.inCommunityId = action.payload;
    },
    setUserCommunity: (state, action: PayloadAction<number>) => {
      state.userCommunity = action.payload;
    },
    setPollInCommunity: (state, action: PayloadAction<number>) => {
      state.pollInCommunity = action.payload;
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
  setInCommunityId,
  setUserCommunity,
  setPollInCommunity,
  setCommunityName,
  setSearchTerm,
  openCreateCommunity,
  closeCreateCommunity,
  setUserData,
  setInvitedUsers,
} = communitySlice.actions;

export default communitySlice.reducer;

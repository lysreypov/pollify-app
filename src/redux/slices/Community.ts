// Define state reducer
import CommunityState, {
  UpdateCommunityAction,
  User,
} from "../../types/redux/community";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CommunityState = {
  userCommunity: 0,
  communityName: "",
  inCommunityId: 0,
  searchTerm: "",
  isCreateCommunityOpen: false,
  isBackToCommunity: false,
  isCommunityProfileOpen: false,
  userData: [],
  invitedUsers: [],
  communityMembers: [],
  isOpenUserProfileMobile: false,
};

export const communitySlice = createSlice({
  name: UpdateCommunityAction,
  initialState: initialState,
  reducers: {
    setUserCommunity: (state, action: PayloadAction<number>) => {
      state.userCommunity = action.payload;
    },
    setInCommunityId: (state, action: PayloadAction<number>) => {
      state.inCommunityId = action.payload;
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
    setIsBackToCommunity: (state, action: PayloadAction<boolean>) => {
      state.isBackToCommunity = action.payload;
    },
    setIsCommunityProfileOpen: (state, action: PayloadAction<boolean>) => {
      state.isCommunityProfileOpen = action.payload;
    },
    setUserData: (state, action: PayloadAction<User[]>) => {
      state.userData = action.payload;
    },
    setInvitedUsers: (state, action: PayloadAction<User[]>) => {
      state.invitedUsers = action.payload;
    },
    setCommunityMembers: (state, action: PayloadAction<User[]>) => {
      state.communityMembers = action.payload;
    },
    setIsOpenUserProfileMobile: (state) => {
      state.isOpenUserProfileMobile = !state.isOpenUserProfileMobile;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserCommunity,
  setCommunityName,
  setInCommunityId,
  setSearchTerm,
  openCreateCommunity,
  closeCreateCommunity,
  setIsBackToCommunity,
  setIsCommunityProfileOpen,
  setUserData,
  setInvitedUsers,
  setCommunityMembers,
  setIsOpenUserProfileMobile,
} = communitySlice.actions;

export default communitySlice.reducer;

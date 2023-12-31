import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  UserCommunityState,
  UpdateUserCommunityAction,
} from "../../types/redux/user_community";

const initialState: UserCommunityState = {
  id: 0,
  community: [],
  email: "",
  username: "",
};

export const userCommunitySlice = createSlice({
  name: UpdateUserCommunityAction,
  initialState: initialState,
  reducers: {
    setUserCommunity: (state, action: PayloadAction<UserCommunityState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserCommunity } = userCommunitySlice.actions;

export default userCommunitySlice.reducer;

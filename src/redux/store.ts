// Store state globalizely
import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slices/RegisterForm";
import communityReducer from "./slices/Community";
import CreatePollReducer from "./slices/CreatePoll";
import otpReducer from "./slices/Otp";
import userCommunityReducer from "./slices/UserCommunity";
import Auth from "./slices/Auth";

const store = configureStore({
  reducer: {
    auth: Auth,
    register: registerReducer,
    community: communityReducer,
    userCommunity: userCommunityReducer,
    createPoll: CreatePollReducer,
    otp: otpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

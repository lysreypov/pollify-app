// Store state globalizely
import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slices/RegisterForm";
import communityReducer from "./slices/Community";

const store = configureStore({
  reducer: {
    register: registerReducer,
    createCommunity: communityReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

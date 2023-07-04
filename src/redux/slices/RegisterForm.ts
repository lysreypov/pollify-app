// Define state reducer
import RegisterState, {
  UpdateRegisterAction,
  ErrorMessage,
} from "../../types/redux/register";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RegisterState = {
  username: "",
  email: "",
  password: "",
  isAgree: false,
  errorMessage: {
    usernameMessage: "",
    emailMessage: "",
    passwordMessage: "",
  },
};

export const registerSlice = createSlice({
  name: UpdateRegisterAction,
  initialState: initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setIsAgree: (state, action: PayloadAction<boolean>) => {
      state.isAgree = action.payload;
    },
    setPasswordErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage.passwordMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUsername,
  setEmail,
  setPassword,
  setIsAgree,
  setPasswordErrorMessage,
} = registerSlice.actions;

export default registerSlice.reducer;

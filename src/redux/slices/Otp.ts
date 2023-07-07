// Define state reducer
import OtpState, { UpdateOtpAction } from "../../types/redux/otp";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: OtpState = {
  otpCodes: ["", "", "", ""],
  activeOtpIndex: 0,
  isValid: false,
  errorMessage: "",
};

export const otpSlice = createSlice({
  name: UpdateOtpAction,
  initialState: initialState,
  reducers: {
    setOtpCodes: (state, action: PayloadAction<Array<string>>) => {
      state.otpCodes = action.payload;
    },
    setActiveOtpIndex: (state, action: PayloadAction<number>) => {
      state.activeOtpIndex = action.payload;
    },
    setIsValid: (state, action: PayloadAction<boolean>) => {
      state.isValid = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOtpCodes, setActiveOtpIndex, setIsValid, setErrorMessage } =
  otpSlice.actions;

export default otpSlice.reducer;

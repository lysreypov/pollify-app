// Define state action

interface OtpState {
  otpCodes: Array<string>;
  activeOtpIndex: number;
  isValid: boolean;
  errorMessage: string;
}

const UpdateOtpAction = "OTP Verify";

export default OtpState;
export { UpdateOtpAction };

// Define state action

export interface ErrorMessage {
  usernameMessage: string;
  emailMessage: string;
  passwordMessage: string;
}

interface RegisterState {
  username: string;
  email: string;
  password: string;
  isAgree: boolean;
  errorMessage: ErrorMessage;
}

const UpdateRegisterAction = "Sign Up";

export default RegisterState;
export { UpdateRegisterAction };

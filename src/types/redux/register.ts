// Define state action
interface RegisterState {
  username: string;
  email: string;
  password: string;
  isAgree: boolean;
}

const UpdateRegisterAction = "Sign Up";

export default RegisterState;
export { UpdateRegisterAction };

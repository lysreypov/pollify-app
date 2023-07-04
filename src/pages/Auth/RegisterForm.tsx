import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { FaGithub, FaTwitter } from "react-icons/fa";
import pollifyLogo from "../../assets/PolliFy.png";
import GoogleLogin from "react-google-login";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  setUsername,
  setEmail,
  setPassword,
  setIsAgree,
  setPasswordErrorMessage,
} from "../../redux/slices/RegisterForm";

const clientId =
  "169663001832-rnhhvl1ump4dj98k56gi44ejt8h5i0mn.apps.googleusercontent.com";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { username, email, password, isAgree, errorMessage } = useSelector(
    (state: RootState) => state.register
  );

  const [showPassword, setShowPassword] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(e.target.value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password_pattern = /^.{8,}$/;
    if (!password_pattern.test(e.target.value)) {
      dispatch(
        setPasswordErrorMessage(
          "Password should be at least 8 characters long."
        )
      );
    } else {
      dispatch(setPasswordErrorMessage(""));
    }
    dispatch(setPassword(e.target.value));
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleIsAgreedChange = () => {
    dispatch(setIsAgree(!isAgree));
  };

  const handleSignInInstead = () => {
    navigate("/user/sign_in");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { username, email, password };

    const registerUser = async () => {
      try {
        // Perform API call to sign up with the backend
        let response = await fetch(
          "http://13.251.127.67:8080/api/v1/register-user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(userData),
          }
        );

        if (response.ok) {
          response = await response.json();
          localStorage.setItem("user-info", JSON.stringify(response));

          // Clear form inputs
          dispatch(setUsername(""));
          dispatch(setEmail(""));
          dispatch(setPassword(""));
          dispatch(setIsAgree(false));
          setShowPassword(false);
          navigate("/auth/verification");
        } else {
          // Registration failed, handle the error
          const errorData = await response.json();
          console.log("Registration failed:", errorData);
        }
      } catch (error) {
        // Handle error response from the backend
        // setErrorMessage("Sign-up failed. Please try again.");
        console.log("An error occurred:", error);
      }
    };

    registerUser();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex justify-center flex-col h-auto  text-gray-500 px-8 py-6 bg-white md:rounded-md md:shadow-lg lg:shadow-lg"
      >
        <div className="mb-5">
          <img
            className="lg:mx-auto mb-4"
            src={pollifyLogo}
            alt="Pollify Logo"
          />
          <h1 className="text-lg font-bold">Welcome to Materio!👋🏻</h1>
          <small>Please register your account and start the adventure</small>
        </div>
        <div className="flex justify-center flex-col">
          <input
            className="border text-gray-700 border-gray-300 rounded px-3 py-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <input
            className="border text-gray-700 border-gray-300 rounded px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mb-4"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <div className="flex relative mb-2">
            <input
              className="relative text-gray-700 border border-gray-300 rounded px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button
              id="show_password"
              type="button"
              onClick={handlePasswordVisibility}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="absolute right-2 top-3 text-gray-500 w-5 h-5" />
              ) : (
                <AiOutlineEye className="absolute right-2 top-3 text-gray-500 w-5 h-5" />
              )}
            </button>
          </div>
          {errorMessage.passwordMessage && (
            <small className="text-red-500 mb-3">
              {errorMessage.passwordMessage}
            </small>
          )}
          <div className="flex flex-col">
            <div className="flex flex-row items-center text-sm">
              <input
                type="checkbox"
                checked={isAgree}
                className="form-checkbox rounded mr-2 w-4 h-4"
                onChange={handleIsAgreedChange}
              />
              <span>I agree to privacy policy & terms</span>
            </div>
          </div>
          <button
            id="submit"
            className="w-full text-white uppercase bg-blue-custom rounded mt-4 py-2 hover:opacity-70"
            disabled={!isAgree}
          >
            Sign Up
          </button>
          <span className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/user/sign_in"
              className="text-blue-custom font-bold hover:opacity-70"
              onClick={handleSignInInstead}
            >
              Sign in instead
            </Link>
          </span>
        </div>
        <div className="flex items-center justify-center mt-2">
          <span className="flex-grow border-t border-gray-300 mx-2"></span>
          <p className="text-gray-400">or</p>
          <span className="flex-grow border-t border-gray-300 mx-2"></span>
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <button id="facebook" type="button">
            <BsFacebook className="w-6 h-6 text-blue-600 hover:opacity-70" />
          </button>
          <button id="github" type="button">
            <FaGithub className="w-6 h-6 text-gray-800 hover:opacity-70" />
          </button>
          <button id="twitter" type="button">
            <FaTwitter className="text-blue-400 w-6 h-6 hover:opacity-70" />
          </button>
          <button id="google" type="button">
            <FcGoogle className="w-6 h-6 hover:opacity-70" />
          </button>

          {/* <GoogleLogin
            className="w-full flex justify-center"
            buttonText="Sign up with Google"
            clientId={clientId}
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy={"single_host_origin"}
          /> */}
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;

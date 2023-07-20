import React, { useState } from "react";
import MainLogo from "../../assets/images/pollify_logo.png";
import { Link, redirect, useNavigate } from "react-router-dom";
// import GoogleLogin, {
//   GoogleLoginResponse,
//   GoogleLoginResponseOffline,
// } from "react-google-login";
import { clientId } from "../../config/config";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, setAccessToken } from "../../redux/slices/Auth";
import api from "../../utils/api";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isRedirected = window.location.search.includes("redirect");
  let inviteToken = "";
  if (isRedirected) {
    inviteToken = window.location.search.split("=")[1];
  }

  // Handling login
  const dispatch = useDispatch();
  // const accessToken = useSelector((state: any) => state.auth.accessToken);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    const data = {
      username: email,
      password: password,
    };

    try {
      const response = await api.post("/auth/login", data);

      if (response.status === 200) {
        const { token } = response.data;

        dispatch(setAccessToken(token));
        localStorage.setItem("accessToken", `${token}`);

        if (isRedirected) {
          navigate(`/community/invite/${inviteToken}`);
        } else {
          navigate("/community");
        }
      }
    } catch (error) {
      alert("Can not login");
      console.log("cannot log in", error);
    }
  };

  // const handleGoogleSuccess = (
  //   response: GoogleLoginResponse | GoogleLoginResponseOffline
  // ) => {
  //   console.log("Google Sign up Success", response);
  // };

  // const handleGoogleFailure = (error: any) => {
  //   console.log("Google Sign up Fail", error);
  // };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-[#828282]">
      <form
        className="px-8 pt-6 pb-8 mb-4 bg-white md:rounded-md md:shadow-lg lg:shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center lg:justify-center mb-4">
          <img src={MainLogo} alt="Pollify logo" />
        </div>
        <div className="pb-5">
          <h2 className="text-lg font-bold">Welcome To Pollify!👋🏻</h2>
          <small>Please log in to your account and start the adventure</small>
        </div>
        <div>
          <input
            className="border text-gray-700 border-gray-300 rounded px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mb-4"
            id="email"
            type="text"
            placeholder="Username"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="relative">
          <input
            className="border text-gray-700 border-gray-300 rounded px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            className="absolute right-0 top-1 mt-2 mr-3 text-gray-500"
            onClick={handleShowPassword}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </button>
        </div>
        <div className="flex items-center mb-6 pt-2">
          <input
            className="mr-2 w-4 h-4 leading-tight"
            type="checkbox"
            id="rememberMe"
          />
          <label className="text-sm" htmlFor="rememberMe">
            Remember me
          </label>
          <Link
            to="/user/forgot_password"
            className="text-blue-custom ml-auto text-sm hover:opacity-80"
          >
            Forgot password?
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="w-full uppercase bg-[#2D9CDB] hover:opacity-80 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        </div>
        <div className="flex items-center justify-center py-2 mt-3">
          <p className="pr-3 font-light text-sm">New on our platform?</p>
          <Link
            to={
              isRedirected
                ? `/user/sign_up?redirect=${inviteToken}`
                : "/user/sign_up"
            }
            className="inline-block align-baseline font-bold text-sm text-[#2D9CDB] hover:opacity-70"
          >
            Create an account
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <span className="flex-grow border-t border-gray-300 mx-2"></span>
          <p className="text-gray-400">or</p>
          <span className="flex-grow border-t border-gray-300 mx-2"></span>
        </div>
        <div className="flex items-center justify-center space-x-5 pt-4">
          {/* <span>
            <BsFacebook className="text-blue-600 w-6 h-6 hover:opacity-70" />
          </span>
          <span>
            <FaGithub className="text-gray-800 w-6 h-6 hover:opacity-70" />
          </span>
          <span>
            <FaTwitter className="text-blue-400 w-6 h-6 hover:opacity-70" />
          </span>
          <span>
            <FcGoogle className="w-6 h-6 hover:opacity-70" />
          </span> */}
          {/* <GoogleLogin
            className="w-full flex justify-center"
            clientId={clientId}
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy={"single_host_origin"}
            // uxMode="redirect"
            isSignedIn={false}
            render={(renderProps: any) => (
              <button
                className="flex border w-full justify-center items-center rounded py-3 gap-2 border-gray-300 hover:bg-gray-200 hover:border-gray-500"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className="w-5 h-5" />
                <span className="text-sm">Sign in with Google</span>
              </button>
            )}
          /> */}
        </div>
      </form>
    </div>
  );
};
export default LoginForm;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setEmail } from "../../redux/slices/Auth";
import api from "../../utils/api";

const EmailToResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector((state: RootState) => state.auth);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `${accessToken}`,
    };
    const body = {
      email: email,
    };

    try {
      const response = await api.post("/forgot-password", body, { headers });

      if (response.status === 200) {
        //clear form input

        navigate("/auth/verify_forgot_password");
      }
    } catch (error) {
      alert("Can not Reset Password");
      console.log("An error occured: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex justify-center flex-col h-auto  text-gray-500 px-8 py-6 bg-white md:rounded-md md:shadow-lg lg:shadow-lg"
      >
        <div className="mb-5">
          <h1 className="text-blue-custom text-2xl font-bold">
            Forgot your password?
          </h1>
          <small>Please enter your email address to reset your password</small>
        </div>
        <div className="flex justify-center flex-col">
          <input
            className="border text-gray-700 border-gray-300 rounded px-3 py-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />

          <button
            id="submit"
            className="w-full text-white uppercase bg-blue-custom rounded mt-4 py-2 hover:opacity-70"
          >
            Send
          </button>
          <span className="mt-4 text-center text-sm">
            <Link
              to="/user/sign_in"
              className="text-blue-custom font-bold hover:opacity-70"
            >
              Back to Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default EmailToResetPassword;

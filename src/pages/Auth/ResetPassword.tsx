import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  setEmail,
  setNewPassword,
  setConfirmPassword,
} from "../../redux/slices/Auth";
import { setIsValid } from "../../redux/slices/Otp";
import api from "../../utils/api";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const EmailToResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newPassword, confirmPassword } = useSelector(
    (state: RootState) => state.auth
  );

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
  const [resetPasswordErrorMessage, setResetPasswordErrorMessage] =
    useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password_pattern = /^.{8,}$/;
    if (!password_pattern.test(e.target.value)) {
      setNewPasswordErrorMessage(
        "Password should be at least 8 characters long."
      );
    } else {
      setNewPasswordErrorMessage("");
    }
    dispatch(setNewPassword(e.target.value));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setConfirmPassword(e.target.value));
  };

  const handleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("forgotpassword-accesstoken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const body = {
      password: newPassword,
    };
    if (newPassword === confirmPassword) {
      try {
        const response = await api.post(
          `/reset-password?token=${accessToken}`,
          body,
          { headers }
        );
        if (response.status === 200) {
          console.log("success", response);

          // clear form input
          dispatch(setEmail(""));
          dispatch(setNewPassword(""));
          dispatch(setConfirmPassword(""));
          dispatch(setIsValid(false));

          navigate("/user/sign_in");
        }
      } catch (error) {
        console.log("An error occured: ", error);
      }
    } else {
      setResetPasswordErrorMessage("Password does not match!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex justify-center flex-col h-auto  text-gray-500 px-8 w-96 py-6 bg-white md:rounded-md md:shadow-lg lg:shadow-lg"
      >
        <div className="mb-5">
          <h1 className="text-blue-custom text-2xl font-bold">
            Reset Password
          </h1>
          <small>Please enter new password and confirm it.</small>
        </div>
        <div className="flex justify-center flex-col">
          <div className="flex relative mb-3">
            <input
              className="relative text-gray-700 border border-gray-300 rounded px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              type={showNewPassword ? "text" : "password"}
              placeholder="Password"
              value={newPassword}
              onChange={handlePasswordChange}
              required
            />
            <button type="button" onClick={handleNewPasswordVisibility}>
              {showNewPassword ? (
                <AiOutlineEyeInvisible className="absolute right-2 top-3 text-gray-500 w-5 h-5" />
              ) : (
                <AiOutlineEye className="absolute right-2 top-3 text-gray-500 w-5 h-5" />
              )}
            </button>
          </div>
          {newPasswordErrorMessage && (
            <small className="text-red-500 mb-3">
              {newPasswordErrorMessage}
            </small>
          )}
          <div className="flex relative mb-2">
            <input
              className={`relative text-gray-700 border ${
                resetPasswordErrorMessage
                  ? "border-red-300 bg-red-100 rounded"
                  : "border-gray-300 rounded "
              } px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full`}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            <button type="button" onClick={handleConfirmPasswordVisibility}>
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible className="absolute right-2 top-3 text-gray-500 w-5 h-5" />
              ) : (
                <AiOutlineEye className="absolute right-2 top-3 text-gray-500 w-5 h-5" />
              )}
            </button>
          </div>
          {resetPasswordErrorMessage && (
            <small className="text-red-600">{resetPasswordErrorMessage}</small>
          )}

          <button
            id="submit"
            className="w-full text-white uppercase bg-blue-custom rounded mt-4 py-2 hover:opacity-70"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailToResetPassword;

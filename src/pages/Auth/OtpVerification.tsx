import React, { useRef, useEffect } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  setOtpCodes,
  setActiveOtpIndex,
  setIsValid,
  setErrorMessage,
} from "../../redux/slices/Otp";
import { apiURL } from "../../config/config";

let currentOtpIndex = 0;
const result = true;

const OtpVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { otpCodes, activeOtpIndex, isValid, errorMessage } = useSelector(
    (state: RootState) => state.otp
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOptOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const newOtpCodes: string[] = [...otpCodes];
    newOtpCodes[currentOtpIndex] = value.substring(value.length - 1);

    if (!value) dispatch(setActiveOtpIndex(currentOtpIndex - 1));
    else dispatch(setActiveOtpIndex(currentOtpIndex + 1));

    dispatch(setOtpCodes(newOtpCodes));
  };

  const handleOnKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOtpIndex = index;
    if (key === "Backspace") dispatch(setActiveOtpIndex(currentOtpIndex - 1));
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  const handleResend = () => {
    console.log("Resend Code");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataString = localStorage.getItem("user-info");
    const data = dataString ? JSON.parse(dataString) : {};

    const code = otpCodes.join("");
    const username = data.username;
    const verifyData = { username, code };

    try {
      // Perform API call to sign up with the backend
      const response = await fetch(`${apiURL}/api/v1/verify-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(verifyData),
      });

      if (response.ok) {
        dispatch(setIsValid(true));

        // Clear form inputs
        dispatch(setOtpCodes(["", "", "", ""]));
        navigate("/user/sign_in");
      } else {
        // Verification failed, handle the error
        dispatch(setErrorMessage("Verification code is invalid."));
        const errorData = await response.json();
        console.log("Verification failed:", errorData);
      }
    } catch (error) {
      // Handle error response from the backend
      console.log("An error occurred:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center flex-col h-auto  text-gray-500 px-8 py-6 bg-white md:rounded-md md:shadow-lg lg:shadow-lg"
      >
        <div className="flex items-center gap-2">
          <h1 className="text-blue-custom text-2xl font-bold">Verification</h1>
          {isValid ? <BsCheckCircle className="text-green-600" /> : null}
          {errorMessage && <RxCrossCircled className="text-red-600 w-5 h-5" />}
        </div>
        <small>Please enter the verification code we sent to your email.</small>
        {errorMessage && (
          <small className="text-red-600 mt-2 text-center">
            {errorMessage}
          </small>
        )}
        <div className="my-4 flex space-x-3 md:justify-around lg:justify-around items-center">
          {otpCodes.map((_, index) => {
            return (
              <React.Fragment key={index}>
                <input
                  ref={index === activeOtpIndex ? inputRef : null}
                  type="number"
                  className="w-full h-14 md:w-14 lg:w-14 border text-gray-500 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                  onChange={handleOptOnChange}
                  onKeyDown={(e) => handleOnKeyDown(e, index)}
                  value={otpCodes[index]}
                  required
                />
              </React.Fragment>
            );
          })}
        </div>
        <div className="flex justify-center">
          <span className="text-center text-sm">
            Not received?{" "}
            <button
              type="button"
              className="text-blue-custom font-bold hover:opacity-70"
              onClick={handleResend}
            >
              Resend
            </button>
          </span>
        </div>
        <button
          id="submit"
          className="w-full text-white uppercase bg-blue-custom rounded mt-4 py-2 hover:opacity-70"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default OtpVerification;

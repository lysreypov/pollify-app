import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setIsOpenUserProfileMobile } from "../../redux/slices/Community";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpenUserProfileMobile } = useSelector(
    (state: RootState) => state.community
  );
  const handleLogout = () => {
    dispatch(setIsOpenUserProfileMobile());
    navigate("/user/sign_in");
  };

  return (
    <div
      className={`${
        isOpenUserProfileMobile ? "absolute z-50 top-16 right-7" : ""
      }absolute z-50 top-10 right-0 shadow-lg w-64 rounded-md lg:px-4`}
    >
      <div className="flex items-center justify-between px-4 rounded-t-lg lg:rounded-none lg:px-0 h-12 bg-white hover:text-blue-custom border-b">
        <span>Profile</span>
        <HiOutlineUserCircle className="w-5 h-5" />
      </div>
      <div
        className="flex items-center justify-between px-4 rounded-b-lg lg:rounded-none lg:px-0 h-12 bg-white hover:text-blue-custom"
        onClick={handleLogout}
      >
        <span>Logout</span>
        <AiOutlineLogout className="w-5 h-5" />
      </div>
    </div>
  );
};

export default UserProfile;

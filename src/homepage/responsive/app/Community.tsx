import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import PolliFy from "../../../assets/PolliFy.png";
import Avatar from "../../../assets/Avatar.png";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import UserCommunity from "./UserCommunity";
import {
  openCreateCommunity,
  setIsOpenUserProfileMobile,
} from "../../../redux/slices/Community";
import { setUserCommunity } from "../../../redux/slices/UserCommunity";
import { setSearchTerm } from "../../../redux/slices/Community";
import api from "../../../utils/api";
import { UserProfile } from "../../../components";

function Community() {
  const dispatch = useDispatch();
  const { isOpenUserProfileMobile, searchTerm, isBackToCommunity } =
    useSelector((state: RootState) => state.community);

  const { username } = useSelector((state: RootState) => state.userCommunity);

  const handleCreateCommunity = () => {
    dispatch(openCreateCommunity());
  };

  // open and close userprofile
  const handleOpenUserProfile = () => {
    dispatch(setIsOpenUserProfileMobile());
  };

  // get data all users data
  useEffect(() => {
    const fetchUserCommunity = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `${accessToken}`,
      };
      try {
        const response = await api.get("/community_members/user", { headers });
        if (response.status === 200) {
          const userCommunity = response.data;
          dispatch(setUserCommunity(userCommunity));
        }
      } catch (error) {
        console.error("An error occurred: ", error);
      }
    };

    fetchUserCommunity();
  }, []);

  return (
    <div
      className={`${
        isBackToCommunity ? "w-full" : "hidden"
      } duration-300 bg-white lg:relative h-screen lg:w-2/6 lg:flex lg:flex-col overflow-hidden`}
    >
      <div className="logo-profile flex px-5 justify-between items-center">
        <div className="flex lg:justify-center w-full pt-5">
          <img src={PolliFy} alt="Profile 1" className="logo w-fit h-10" />
        </div>
        <div className="translate flex mt-2 gap-x-3 items-center lg:hidden">
          <div className="relative" onClick={handleOpenUserProfile}>
            <div className="flex justify-center items-center w-10 h-10 rounded-full border border-blue-500">
              <span className="font-bold text-xl uppercase">
                {username.slice(0, 2)}
              </span>
            </div>
            <span className="bottom-1 left-8 absolute w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
          </div>
        </div>
        <div className="lg:hidden">
          {isOpenUserProfileMobile && <UserProfile />}
        </div>
      </div>
      <div className="line border border-gray-200 mt-8 lg:hidden"></div>
      <div className="search-community-field relative mt-5 px-4 flex justify-center">
        <div className="w-full left-7 absolute inset-y-0 flex items-center pointer-events-none">
          <AiOutlineSearch className="text-blue-custom w-5 h-5" />
        </div>
        <input
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          type="text"
          placeholder="Search Community"
          className="py-2 px-4 pl-9 border-2 border-gray-300 w-full rounded-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="create-community flex items-center gap-x-3 px-4 mt-7">
        <button
          className="flex justify-center items-center cursor-pointer w-9 h-9 rounded-full bg-blue-custom hover:opacity-70"
          type="button"
          onClick={handleCreateCommunity}
        >
          <BsPlus className="w-6 h-6 text-white" />
        </button>
        <h1>Create Community</h1>
      </div>
      {/* {isCreateCommunityOpen && <CreateCommunity />} */}
      {/* {community && community.length > 0 ? (
        <div> */}
      {/* <h1 className="mt-4 px-4">Favorite</h1>
          <AddedFavorite /> */}
      <h1 className="mt-5 px-4">Your Community</h1>
      <UserCommunity />
      {/* </div>
      ) : null} */}
    </div>
  );
}

export default Community;

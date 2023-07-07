import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import PolliFy from "../../../assets/PolliFy.png";
import Avatar from "../../../assets/Avatar.png";
import { MdTranslate } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import AddedFavorite from "./AddedFavorite";
import UserCommunity from "./UserCommunity";
import { openCreateCommunity } from "../../../redux/slices/Community";
import CreateCommunity from "../../popup/CreateCommunity";
import { QueryClient, QueryClientProvider } from "react-query";
import { apiURL, accessToken } from "../../../config/config";
import { setUserCommunity } from "../../../redux/slices/UserCommunity";

function Community() {
  const dispatch = useDispatch();
  const { isCreateCommunityOpen } = useSelector(
    (state: RootState) => state.community
  );
  const { community } = useSelector((state: RootState) => state.userCommunity);

  const queryClient: QueryClient = new QueryClient();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleCreateCommunity = () => {
    dispatch(openCreateCommunity());
  };

  // get data all users data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiURL}/api/v1/community_members/user`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const userCommunity = await response.json();
          dispatch(setUserCommunity(userCommunity));
        }
      } catch (error) {
        console.error("An error occurred: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className=" bg-white h-screen hidden lg:w-2/6 lg:flex lg:flex-col">
      <div className="logo-profile flex justify-between items-center">
        <div className="flex justify-center w-full pt-5">
          <img src={PolliFy} alt="Profile 1" className="logo w-fit h-10" />
        </div>
        <div className="translate flex gap-x-3 items-center lg:hidden">
          <MdTranslate className="w-6 h-6" />
          <IoMdNotificationsOutline className="w-6 h-6" />
          <div className="relative">
            <img
              src={Avatar}
              alt="Profile 1"
              className="w-8 h-8 rounded-full mr-2 border-2 border-blue-custom"
            />
            <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>
        </div>
      </div>
      <div className="line border border-gray-200 ml-5 mr-5 lg:hidden"></div>
      <div className="search-community-field relative mt-5 px-4 flex justify-center">
        <div className="w-full left-7 absolute inset-y-0 flex items-center pointer-events-none">
          <AiOutlineSearch className="text-gray-400 w-5 h-5" />
        </div>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
      {isCreateCommunityOpen && <CreateCommunity />}
      {community && community.length > 0 ? (
        <div>
          <h1 className="mt-4 px-4">Favorite</h1>
          <AddedFavorite />

          <h1 className="mt-4 px-4">Your Community</h1>
          <UserCommunity searchQuery={searchQuery} />
        </div>
      ) : null}
    </div>
  );
}

export default Community;

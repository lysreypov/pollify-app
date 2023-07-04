import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import PolliFy from "../../../assets/PolliFy.png";
import Avatar from "../../../assets/Avatar.png";
import { MdTranslate } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsFillPlusCircleFill } from "react-icons/bs";
import AddedFavorite from "./AddedFavorite";
import Favorite from "./Favorite";
import { openCreateCommunity } from "../../../redux/slices/Community";
import CreateCommunity from "../../popup/CreateCommunity";
import { QueryClient, QueryClientProvider } from "react-query";

function Community() {
  const dispatch = useDispatch();
  const { isCreateCommunityOpen } = useSelector(
    (state: RootState) => state.createCommunity
  );

  const queryClient: QueryClient = new QueryClient();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleCreateCommunity = () => {
    dispatch(openCreateCommunity());
  };

  return (
    <div className="container flex flex-col bg-white gap-y-8 h-auto font-sans lg:w-2/6">
      <div className="logo-profile flex justify-between items-center mt-5 ml-5 mr-5">
        <img src={PolliFy} alt="Profile 1" className="logo w-fit h-7" />
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
      <div className="search-community-field relative mr-5 flex ml-5">
        <div className="w-full absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search community"
          className="py-2 pl-10 border border-gray-300 w-full bg-white rounded-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="create-community flex items-center gap-x-3 ml-5 mr-5">
        <button
          className="cursor-pointer hover:opacity-70"
          type="button"
          onClick={handleCreateCommunity}
        >
          <BsFillPlusCircleFill className="w-7 h-7 text-blue-custom" />
        </button>
        <h1>Create Community</h1>
      </div>
      {isCreateCommunityOpen && <CreateCommunity />}
      <h1 className="ml-5 mr-5">Favorite</h1>
      <AddedFavorite />
      <h1 className="ml-5 mr-5">Favorite</h1>
      <QueryClientProvider client={queryClient}>
        <Favorite searchQuery={searchQuery} />
      </QueryClientProvider>
    </div>
  );
}

export default Community;

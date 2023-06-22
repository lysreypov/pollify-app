import React from "react";
import Avatar from "../../../assets/Avatar.png";
import { MdTranslate } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiFillTrophy } from "react-icons/ai";
import Poll1 from "./Poll1";
import Poll2 from "./Poll2";
import SelectFood from "./SelectFood";
import Rating from "./Rating";
import { useNavigate } from "react-router-dom";

const trophyIcons = {
  color: "blue",
  opacity: 0.7,
  fontSize: "50px",
};

function CreatePoll() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/communitydetail");
  };

  return (
    <div className="container flex flex-col bg-slate-200 gap-y-5 w-screen h-auto font-sans">
      <div className="bg-white flex flex-col gap-y-8">
        <div className="logo-profile-createPoll flex justify-between items-center mt-5 ml-5 mr-5">
          <p className="whitespace-normal font-sans">
            Welcome to the PitCool bro{" "}
            <span className="text-blue-custom font-bold">TED </span>!
          </p>
          <div className="translate flex gap-x-3 items-center lg:hidden">
            <MdTranslate className="w-6 h-6" />
            <IoMdNotificationsOutline className="w-6 h-6" />
            <div className="relative cursor-pointer" onClick={handleClick}>
              <img
                src={Avatar}
                alt="Profile 1"
                className="w-8 h-8 rounded-full mr-2 border-2 border-blue-500"
              />
              <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
            </div>
          </div>
        </div>
        <div className="create-poll w-full flex flex-row justify-around items-center gap-x-2 mb-5">
          <div className="search-field relative w-11/12 ml-5 flex">
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
              type="text"
              placeholder="Search community"
              className="py-2 px-4 pl-8 border-2 b border-gray-300 w-full rounded-full focus:outline-none focus:border-blue-500"
            />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 text-white whitespace-nowrap rounded-full px-4 py-2">
            Create Poll
          </button>
          <AiFillTrophy
            className="mr-5 border-2 border-blue-500 rounded-full p-1"
            style={trophyIcons}
          />
        </div>
      </div>
      <Poll1 />
      <Poll2 />
      <SelectFood />
      <Rating />
    </div>
  );
}

export default CreatePoll;

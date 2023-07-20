import React from "react";
import { AiFillTrophy } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";

const trophy = {
  color: "blue", // Customize color
  fontSize: "70px", // Customize size
  opacity: 0.7,
};

function CreatePoll() {
  return (
    <>
      <div className="relative flex flex-col w-full overflow-y-auto overflow-x-hidden h-auto">
        <div className="bg-white">
          <h1 className="text-xl font-bold mt-5 mb-11 w-full ml-10">
            Welcome to Pollify bro TED!
          </h1>
        </div>
        <div className="create-poll w-full flex mt-5 flex-row justify-around items-center gap-x-3">
          <div className="relative w-full ml-10 flex flex-grow">
            <div className="w-full absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AiOutlineSearch className="text-gray-400 w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search community"
              className="py-4 pl-10 pr-4 border-2 border-gray-300 w-full bg-slate-200 rounded-full focus:outline-none focus:border-blue-500"
            />
          </div>

          <a
            href="/test"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold whitespace-nowrap rounded-full px-6 py-4"
          >
            Create Poll
          </a>
          <AiFillTrophy
            className="mr-10 border-2 border-blue-500 rounded-full p-1"
            style={trophy}
          />
        </div>
      </div>
    </>
  );
}

export default CreatePoll;

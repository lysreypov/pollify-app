import React from "react";
import { FcPieChart } from "react-icons/fc";
import { AiFillCheckCircle } from "react-icons/ai";
import Avatar from "../../../assets/Avatar.png";

const selectFoodIcons = {
  color: "blue",
  opacity: 0.6,
};

function SelectFood() {
  return (
    <div className="select-food flex flex-col ml-5 mr-5 border h-fit bg-white rounded-md">
      <div className="userChart flex justify-between items-center">
        <div className="User flex mt-5 ml-5 relative">
          <img
            src={Avatar}
            alt="Profile 1"
            className="w-10 h-10 rounded-full mr-2 border-2 border-blue-500"
          />
          <h5 className="text-sm">
            <span className="bottom-1 left-8 absolute  w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
            Ted <br />
            <h4>21 Jul</h4>
          </h5>
        </div>
        <FcPieChart className="mr-5 mt-5 w-10 h-10" />
      </div>
      <p className="mt-5 ml-5 font-light text-[14px] text-gray-500 md:text-[17px]">
        here is the new menus for this lunch. <br />
        Please vote for 3 food options.
      </p>
      <div className="foodSelected grid md:grid-cols-2 grid-rows-4 md:grid-rows-2 gap-4 mt-5 ml-5 mr-5">
        <div className="border border-neutral-300 px-5 py-3 flex bg-white items-center gap-x-2 rounded-xl shadow">
          <div className="radio w-4 h-4 border border-gray-300 rounded-full"></div>
          <h1 className="font-bold font-sans text-[15px]">BBQ</h1>
        </div>
        <div className="border-2 border-sky-300 px-5 py-3 bg-blue-300 flex items-center gap-x-2 rounded-xl shadow">
          <AiFillCheckCircle className="w-5 h-5" style={selectFoodIcons} />
          <h1 className="font-bold font-sans text-[15px]">Khmer Noodle</h1>
        </div>
        <div className="border-2 border-sky-300 px-5 py-3 bg-blue-300 flex items-center gap-x-2 rounded-xl shadow">
          <AiFillCheckCircle className="w-5 h-5" style={selectFoodIcons} />
          <h1 className="font-bold font-sans text-[15px]">Salt Egg Boiled</h1>
        </div>
        <div className="border border-neutral-300 px-5 py-3 flex bg-white items-center gap-x-2 rounded-xl shadow">
          <div className="radio w-4 h-4 border border-gray-300 rounded-full"></div>
          <h1 className="font-bold font-sans text-[15px]">Fried Chicken</h1>
        </div>
      </div>
      <div className="progress-bar mt-5 ml-5 mr-5">
        <div className="mb-1 text-base font-bold font-sans dark:text-white flex justify-between items-center">
          <h1 className="md:text-[17px]">Please Vote</h1>
          <h1 className="text-sky-500 font-bold md:text-[17px]">2/3</h1>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3 mb-4 dark:bg-gray-100">
          <div className="w-2/6 bg-sky-500 h-full rounded-full dark:bg-blue-500"></div>
        </div>
      </div>
    </div>
  );
}

export default SelectFood;

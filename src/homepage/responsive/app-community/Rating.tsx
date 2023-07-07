import React from "react";
import { CiStar } from "react-icons/ci";
import { BsFillStarFill } from "react-icons/bs";
import { CiCircleCheck } from "react-icons/ci";
import Frame1000013729 from "../../../assets/Frame1000013729.png";
import Frame1000013728 from "../../../assets/Frame1000013728.png";
import Frame1000013730 from "../../../assets/Frame1000013730.png";
import Avatar from "../../../assets/Avatar.png";

const starIcons = {
  color: "yellow",
  opacity: 0.7,
};
const selectIcon = {
  color: "green",
  opacity: 0.6,
};

function Rating() {
  return (
    <div className="Rating flex flex-col bg-white border h-fit mb-10 rounded-md">
      <div className=" userChart flex justify-between items-center">
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
        <div className="rating flex items-center gap-x-3 mt-5 mr-5 md:gap-x-2">
          <div className="stars flex gap-x-2 invisible lg:visible">
            <CiStar className="w-5 h-5" />
            <CiStar className="w-5 h-5" />
            <BsFillStarFill className="w-5 h-5" style={starIcons} />
            <BsFillStarFill className="w-5 h-5" style={starIcons} />
            <BsFillStarFill className="w-5 h-5" style={starIcons} />
          </div>
          <CiCircleCheck className="w-8 h-8" style={selectIcon} />
        </div>
      </div>
      <p className="mt-5 ml-5 font-light text-[14px] text-gray-500 md:text-[17px]">
        here is the new menus for this lunch. <br />
        Please vote for 3 food options.
      </p>
      <div className="rating-food flex ml-5 mb-5 justify-evenly items-center mt-5">
        <div className="rank-1 flex flex-col items-center gap-y-1">
          <img
            src={Frame1000013730}
            alt="Profile 1"
            className="w-16 h-16 rounded-full mr-2  border-2 border-blue-500 lg:w-32 lg:h-32 md:w-24 md:h-24"
          />
          {/* <h1>Somlor Korko</h1>
          <h4 className="text-[#2D9CDB]"> 30%</h4> */}
        </div>
        <div className="rank2 flex flex-col items-center">
          <img
            src={Frame1000013728}
            alt="Profile 1"
            className="w-16 h-16 rounded-full mr-2 border-2 border-blue-500 lg:w-32 lg:h-32 md:w-24 md:h-24"
          />
          {/* <h1>Kangkep Boak</h1>
          <h4 className="text-[#2D9CDB]">80%</h4> */}
        </div>
        <div className="rank3 flex flex-col items-center">
          <img
            src={Frame1000013729}
            alt="Profile 1"
            className="w-16 h-16 rounded-full mr-2 border-2 border-blue-500 lg:w-32 lg:h-32 md:w-24 md:h-24"
          />
          {/* <h1>Kari Salaman</h1>
          <h4 className="text-[#2D9CDB]">50%</h4> */}
        </div>
      </div>
      <div className="border border-gray-200 ml-5 mr-5 mb-5 md:visible lg:invisible"></div>
      <div className="line flex justify-center items-center gap-x-2 mb-5 md:visible lg:invisible">
        <CiStar className="w-5 h-5" />
        <CiStar className="w-5 h-5" />
        <BsFillStarFill className="w-5 h-5" style={starIcons} />
        <BsFillStarFill className="w-5 h-5" style={starIcons} />
        <BsFillStarFill className="w-5 h-5" style={starIcons} />
      </div>
    </div>
  );
}

export default Rating;

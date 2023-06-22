import React from "react";
import Ellipse1008 from "../../../assets/community/Ellipse1008.png";
import Ellipse10010 from "../../../assets/community/Ellipse10010.png";
import Ellipse10011 from "../../../assets/community/Ellipse10011.png";
import Ellipse1009 from "../../../assets/community/Ellipse1009.png";

function Favorite() {
  return (
    <div className="profile flex flex-col gap-y-4 ml-5 mr-5">
      <div className="flex">
        <img
          src={Ellipse1008}
          alt="Profile 1"
          className="w-8 h-8 rounded-full mr-2 border-2 border-blue-500"
        />
        <h1>Party</h1>
      </div>
      <div className="flex">
        <img
          src={Ellipse10010}
          alt="Profile 1"
          className="w-8 h-8 rounded-full mr-2 border-2 border-blue-500"
        />
        <h1>Game Ball Weekend</h1>
      </div>
      <div className="flex">
        <img
          src={Ellipse10011}
          alt="Profile 1"
          className="w-8 h-8 rounded-full mr-2 border-2 border-blue-500"
        />
        <h1>Tv Phum C Ey</h1>
      </div>
      <div className="flex">
        <img
          src={Ellipse1009}
          alt="Profile 1"
          className="w-8 h-8 rounded-full mr-2 border-2 border-blue-500"
        />
        <h1>Saturday Phirk</h1>
      </div>
    </div>
  );
}

export default Favorite;

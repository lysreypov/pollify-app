import React from "react";
import Ellipse1006 from "../../../assets/community/Ellipse1006.png";
import Ellipse1007 from "../../../assets/community/Ellipse1007.png";
import { useNavigate } from "react-router-dom";

function AddedFavorite() {
  const navigate = useNavigate();
  const handleClick = () => {
    // navigate("/createpoll");
    console.log("Favorite");
  };
  return (
    <div className="profile flex flex-col h-28 gap-y-1 mt-5 mr-1 overflow-hidden hover:overflow-auto community-scrolling">
      <div className="flex items-center py-2 px-4">
        <img
          src={Ellipse1006}
          alt="Profile 1"
          className="w-9 h-9 rounded-full mr-2 border border-blue-500"
        />
        <h1>KIT</h1>
      </div>
      <div className="flex items-center py-2 px-4">
        <img
          src={Ellipse1006}
          alt="Profile 1"
          className="w-9 h-9 rounded-full mr-2 border border-blue-500"
        />
        <h1>KIT</h1>
      </div>
      <div className="flex items-center py-2 px-4">
        <img
          src={Ellipse1006}
          alt="Profile 1"
          className="w-9 h-9 rounded-full mr-2 border border-blue-500"
        />
        <h1>KIT</h1>
      </div>
    </div>
  );
}

export default AddedFavorite;

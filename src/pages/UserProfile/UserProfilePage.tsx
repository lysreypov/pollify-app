import React from "react";
import Cover from "./Image.png";

function UserProfilePage() {
  const username = "Phalla Borormey";
  return (
    <div className="w-screen min-h-screen">
      <div className="w-full bg-[#F2F4F7] h-full px-4">
        <div className="relative w-full h-[350px] border-[1px] rounded border-gray-50 bg-white">
          <div className=" w-full h-64">
            <img src={Cover} alt="cover" className="h-64 w-full" />
          </div>

          <div className="absolute top-56 left-4 w-full flex flex-row items-center ">
            <div className="h-24 w-24 bg-white border-[1px] rounded-full"></div>
            <div className="pl-4 pt-6">{username}</div>
          </div>
        </div>

        <div className="bg-transparent w-full">
          <div className=""></div>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;

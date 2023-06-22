import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { TiDelete } from "react-icons/ti";
import { HiOutlineCamera } from "react-icons/hi";
import { RxCrossCircled } from "react-icons/rx";
import avatar1 from "../../assets/userProfile/Avatar-1.png";
import avatar2 from "../../assets/userProfile/Avatar-2.png";
import avatar3 from "../../assets/userProfile/Avatar-3.png";
import avatar4 from "../../assets/userProfile/Avatar-4.png";
import avatar5 from "../../assets/userProfile/Avatar-5.png";
import avatar6 from "../../assets/userProfile/Avatar-6.png";
import avatar7 from "../../assets/userProfile/Avatar-7.png";
import avatar8 from "../../assets/userProfile/Avatar-8.png";
import {
  setUserProfile,
  closeCreateCommunity,
} from "../../redux/slices/Community";

function CreateCommunity() {
  const dispatch = useDispatch();
  const { userProfile } = useSelector(
    (state: RootState) => state.createCommunity
  );
  // const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const handleUplaodImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    console.log("Upload", file);
    // error
    if (file) {
      dispatch(setUserProfile(file));
    }
  };

  const handleCloseCreateCommunity = () => {
    console.log("Close");
    dispatch(closeCreateCommunity());
  };

  return (
    <div className="h-screen fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div
        className="fixed z-10 inset-0 bg-gray-500 opacity-60"
        onClick={handleCloseCreateCommunity}
      ></div>
      <form className="fixed z-20 flex flex-col justify-center items-start bg-white px-4 sm:px-8 py-6 w-full h-auto md:w-5/6 lg:w-2/5 rounded-lg">
        <div className="flex flex-col w-full justify-center items-center">
          <h1 className=" text-blue-custom text-lg mb-4">
            Create New Community
          </h1>
          <button
            className="absolute top-6 right-7"
            onClick={handleCloseCreateCommunity}
          >
            <RxCrossCircled className="w-7 h-7 text-gray-400 hover:text-blue-custom" />
          </button>
          <div className="">
            <label
              className="flex justify-center items-center bg-blue-custom bg-opacity-10 rounded-full border border-blue-custom cursor-pointer w-20 h-20"
              htmlFor="uploadProfile"
            >
              {userProfile ? (
                <img
                  src={URL.createObjectURL(userProfile)}
                  alt="Selected Profile"
                  className="w-full h-full object-cover rounded-full border border-blue-custom"
                />
              ) : (
                <HiOutlineCamera className="text-blue-custom w-12 h-12 stroke-1 " />
              )}
            </label>
            <input
              id="uploadProfile"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUplaodImage}
            />
          </div>
          <input
            className="text-gray-700 text-center w-full py-3 px-4 focus:outline-none"
            type="text"
            placeholder="Community Name..."
          />
        </div>
        <div className="w-full">
          <span className="text-gray-400">Search</span>
          <input
            id="search_user"
            className="text-gray-700 mt-2 py-2 px-4 w-full rounded border-2 border-neutral-300 focus:outline-none"
            type="email"
            placeholder="Type email..."
          />
        </div>
        <div className="flex flex-col justify-start mt-4">
          <span className="text-gray-400">Invite to Community</span>
          <div
            id="user"
            className="flex flex-wrap w-auto gap-2 mt-2 h-20 overflow-auto"
          >
            <div className="flex flex-row items-center pl-1 py-1 space-x-2 w-auto border border-blue-custom rounded-full">
              <img className="w-6 h-6" src={avatar1} alt="" />
              <p className="text-sm text-blue-custom">Beier</p>
              <button>
                <TiDelete className="text-blue-custom w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-row items-center pl-1 py-1 space-x-2 w-auto border border-blue-custom rounded-full">
              <img className="w-6 h-6" src={avatar2} alt="" />
              <p className="text-sm text-blue-custom">Considine</p>
              <button>
                <TiDelete className="text-blue-custom w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-row items-center pl-1 py-1 space-x-2 w-auto border border-blue-custom rounded-full">
              <img className="w-6 h-6" src={avatar2} alt="" />
              <p className="text-sm text-blue-custom">Considine</p>
              <button>
                <TiDelete className="text-blue-custom w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-row items-center pl-1 py-1 space-x-2 w-auto border border-blue-custom rounded-full">
              <img className="w-6 h-6" src={avatar2} alt="" />
              <p className="text-sm text-blue-custom">Considine</p>
              <button>
                <TiDelete className="text-blue-custom w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-row items-center pl-1 py-1 space-x-2 w-auto border border-blue-custom rounded-full">
              <img className="w-6 h-6" src={avatar2} alt="" />
              <p className="text-sm text-blue-custom">Considine</p>
              <button>
                <TiDelete className="text-blue-custom w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-row items-center pl-1 py-1 space-x-2 w-auto border border-blue-custom rounded-full">
              <img className="w-6 h-6" src={avatar2} alt="" />
              <p className="text-sm text-blue-custom">Considine</p>
              <button>
                <TiDelete className="text-blue-custom w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-row items-center pl-1 py-1 space-x-2 w-auto border border-blue-custom rounded-full">
              <img className="w-6 h-6" src={avatar2} alt="" />
              <p className="text-sm text-blue-custom">Considine</p>
              <button>
                <TiDelete className="text-blue-custom w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-row items-center pl-1 py-1 space-x-2 w-auto border border-blue-custom rounded-full">
              <img className="w-6 h-6" src={avatar2} alt="" />
              <p className="text-sm text-blue-custom">Considine</p>
              <button>
                <TiDelete className="text-blue-custom w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-row items-center pl-1 py-1 space-x-2 w-auto border border-blue-custom rounded-full">
              <img className="w-6 h-6" src={avatar2} alt="" />
              <p className="text-sm text-blue-custom">Considine</p>
              <button>
                <TiDelete className="text-blue-custom w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-row items-center pl-1 py-1 space-x-2 w-auto border border-blue-custom rounded-full">
              <img className="w-6 h-6" src={avatar2} alt="" />
              <p className="text-sm text-blue-custom">Considine</p>
              <button>
                <TiDelete className="text-blue-custom w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-row items-center pl-1 py-1 space-x-2 w-auto border border-blue-custom rounded-full">
              <img className="w-6 h-6" src={avatar2} alt="" />
              <p className="text-sm text-blue-custom">Considine</p>
              <button>
                <TiDelete className="text-blue-custom w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-row items-center pl-1 py-1 space-x-2 w-auto border border-blue-custom rounded-full">
              <img className="w-6 h-6" src={avatar2} alt="" />
              <p className="text-sm text-blue-custom">Considine</p>
              <button>
                <TiDelete className="text-blue-custom w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-row items-center pl-1 py-1 space-x-2 w-auto border border-blue-custom rounded-full">
              <img className="w-6 h-6" src={avatar2} alt="" />
              <p className="text-sm text-blue-custom">Considine</p>
              <button>
                <TiDelete className="text-blue-custom w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-row items-center pl-1 py-1 space-x-2 w-auto border border-blue-custom rounded-full">
              <img className="w-6 h-6" src={avatar2} alt="" />
              <p className="text-sm text-blue-custom">Considine</p>
              <button>
                <TiDelete className="text-blue-custom w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full mt-6 h-44 overflow-auto">
          <div className="flex flex-row items-center space-x-3 w-full px-1 py-3 border-b border-gray-300">
            <img className="w-8 h-8" src={avatar3} alt="" />
            <p className="text-sm text-black-secondary font-medium">
              Allan Gislason IV
            </p>
          </div>
          <div className="flex flex-row items-center space-x-3 w-full px-1 py-3 border-b border-gray-300">
            <img className="w-8 h-8" src={avatar4} alt="" />
            <p className="text-sm text-black-secondary font-medium">
              Jasmine Kling
            </p>
          </div>
          <div className="flex flex-row items-center space-x-3 w-full px-1 py-3 border-b border-gray-300">
            <img className="w-8 h-8" src={avatar5} alt="" />
            <p className="text-sm text-black-secondary font-medium">
              Desiree Prohaska II
            </p>
          </div>
          <div className="flex flex-row items-center space-x-3 w-full px-1 py-3 border-b border-gray-300">
            <img className="w-8 h-8" src={avatar6} alt="" />
            <p className="text-sm text-black-secondary font-medium">
              Tracy Jaskolski
            </p>
          </div>
          <div className="flex flex-row items-center space-x-3 w-full px-1 py-3 border-b border-gray-300">
            <img className="w-8 h-8" src={avatar7} alt="" />
            <p className="text-sm text-black-secondary font-medium">
              Sherri Beier
            </p>
          </div>
          <div className="flex flex-row items-center space-x-3 w-full px-1 py-3 border-b border-gray-300">
            <img className="w-8 h-8" src={avatar8} alt="" />
            <p className="text-sm text-black-secondary font-medium">
              Donald Considine
            </p>
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-white font-bold bg-blue-custom rounded mt-4 py-3 hover:opacity-70"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateCommunity;

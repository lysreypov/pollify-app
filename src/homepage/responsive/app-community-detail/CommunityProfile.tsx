import React from "react";
import PolliFy from "../../../assets/PolliFy.png";
import Avatar from "../../../assets/Avatar.png";
import { MdTranslate } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import Ellipse1007 from "../../../assets/community/Ellipse1007.png";
import { BsQrCode } from "react-icons/bs";
import Notifications from "./Notifications";
import CommunityMembers from "./CommunityMembers";
import PopupModal from "../../popup/PopupModal";

const qrIcons = {
  color: "blue",
  opacity: 0.7,
};

function CommunityProfile() {
  const [isOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="font-sans bg-white lg:w-2/6 h-full hidden lg:flex lg:flex-col lg:gap-y-5">
      <div className="logo-profile-createPoll flex justify-between lg:justify-end items-center mt-5 ml-5 mr-5">
        <img
          src={PolliFy}
          alt="Profile 1"
          className="logo w-fit h-7 lg:hidden"
        />
        <div className="translate flex gap-x-3 lg:gap-x-5 items-center lg:justify-end">
          <MdTranslate className="w-6 h-6" />
          <IoMdNotificationsOutline className="w-6 h-6" />
          <h1 className="lg:text-[17px] lg:font-sans lg:font-bold">TED</h1>
          <div className="relative">
            <img
              src={Avatar}
              alt="Profile 1"
              className="w-10 h-10 rounded-full mr-2 border-2 border-blue-500"
            />
            <span className="bottom-1 left-8 absolute w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>
        </div>
      </div>
      <div className="border border-gray-100 ml-5 mr-5 lg:hidden"></div>
      <div className="Moringa flex flex-col gap-y-3 mt-5 justify-center items-center">
        <img
          src={Ellipse1007}
          alt="moringa"
          className="w-16 h-16 rounded-full mr-2 border-2 border-blue-500 cursor-pointer"
          onClick={openModal}
        />
        <h1 className="text-[15px]">Moringa</h1>
        <div className="flex justify-center items-center gap-x-6">
          <BsQrCode className="w-8 h-8" style={qrIcons} />
          <button
            id="copyButton"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg"
          >
            Copy Link
          </button>
        </div>
      </div>
      <PopupModal isOpen={isOpen} onClose={closeModal} />
      <div className="line border border-gray-100 ml-5 mr-5"></div>
      <Notifications />
      {/* <CommunityMembers /> */}
    </div>
  );
}

export default CommunityProfile;

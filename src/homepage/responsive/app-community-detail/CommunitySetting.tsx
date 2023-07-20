import React from "react";
import SettingIcon from "../../../assets/icons/setting.svg";
import NotificationIcon from "../../../assets/icons/notification.svg";
import UsersIcon from "../../../assets/icons/users.svg";
import DeleteIcon from "../../../assets/icons/trash.svg";
import { FiSettings } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineGroups } from "react-icons/md";
import { CgToggleOff, CgToggleOn } from "react-icons/cg";
import AddPermission from "../../popup/AddPermission";
import PopupModal from "../../popup/PopupModal";

const notificationICons = {
  color: "gray",
};

function CommunitySetting() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenRole, setIsOpenRole] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const openRoleModal = () => {
    setIsOpenRole(true);
  };
  const closeRoleModal = () => {
    setIsOpenRole(false);
  };

  const [isToggleOpen, setIsToggleOpen] = React.useState(false);
  const handleToggle = () => {
    setIsToggleOpen((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col gap-y-5 mt-4 px-4 border-t py-5">
      <div
        className="flex justify-start items-center gap-x-5 hover:cursor-pointer "
        onClick={openRoleModal}
      >
        <div>
          <img
            className="w-6 h-6 text-red-400"
            src={SettingIcon}
            alt="Setting Icon"
          />
        </div>
        <h1>Edit</h1>
      </div>
      <PopupModal isOpen={isOpenRole} onClose={closeRoleModal} />
      {/* <div className="notifications flex justify-between items-center">
        <div className="toggle-btn flex gap-x-4">
          <div>
            <img
              className="w-6 h-6 text-gray-500"
              src={NotificationIcon}
              alt="Notification Icon"
            />
          </div>
          <h1>Notification</h1>
        </div>
        <div
          className="toggle-btn"
          onClick={handleToggle}
          style={notificationICons}
        >
          {isToggleOpen ? (
            <CgToggleOn className="w-6 h-fit text-blue-custom" />
          ) : (
            <CgToggleOff className="w-6 h-fit text-gray-500" />
          )}
        </div>
      </div> */}
      <div
        className="flex justify-start items-center gap-x-4 cursor-pointer"
        onClick={openModal}
      >
        <div>
          <img
            className="w-6 h-6 text-gray-500"
            src={UsersIcon}
            alt="Users Icon"
          />
        </div>

        <h1>Add Administration Permission</h1>
      </div>
      <AddPermission isOpen={isOpen} onClose={closeModal} />
    </div>
  );
}

export default CommunitySetting;

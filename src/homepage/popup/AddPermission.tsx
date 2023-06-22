import React from "react";
import Avatar from "../../assets/Avatar.png";
import { MdClear } from "react-icons/md";
import Avatar1 from "../../assets/userProfile/Avatar-1.png";
import Avatar2 from "../../assets/userProfile/Avatar-2.png";
import Avatar3 from "../../assets/userProfile/Avatar-3.png";

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface Profile {
  id: number;
  name: string;
  avatar: string;
}
const items: Profile[] = [
  {
    id: 1,
    name: "Allan Gislason IV",
    avatar: Avatar,
  },
  {
    id: 2,
    name: "Jasmine King",
    avatar: Avatar1,
  },
  {
    id: 3,
    name: "Desiree Prohaska ll",
    avatar: Avatar2,
  },
  {
    id: 4,
    name: "Tracy Jaskolki",
    avatar: Avatar3,
  },
];
const clearIcons = {
  color: "white",
  fontSize: "20px",
};

const AddPermission: React.FC<PopupModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        className="bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="addPermission flex flex-col gap-y-6">
            <span className="font-bold text-lg text-sky-500">
              Add Permission
            </span>
            <div className="admins flex flex-row items-center justify-between">
              <span className="mr-2 font-bold">Search User</span>
            </div>
            <input
              className="searchEmail border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Type email..."
            ></input>

            <div className="pollers flex flex-row items-center justify-between">
              <span className="mr-2 font-bold">Pollers</span>
            </div>
            <div className="poller-profile flex gap-x-3">
              <div className="poller-1 flex justify-center items-center border border-sky-500 rounded-full px-1 py-0 gap-x-1">
                <img src={Avatar2} alt="Profile 1" className="w-10 h-10" />
                <span className="text-sky-500">Hakley</span>
                <MdClear
                  style={clearIcons}
                  className="bg-sky-500 rounded-full"
                />
              </div>
              <div className="poller-2 flex justify-center items-center border border-sky-500 rounded-full px-1 py-0 gap-x-1">
                <img src={Avatar3} alt="Profile 1" className="w-10 h-10" />
                <span className="text-sky-500">Leak</span>
                <MdClear
                  style={clearIcons}
                  className="bg-sky-500 rounded-full"
                />
              </div>
            </div>
            <div className="profile flex flex-col gap-y-5">
              {items.map((item) => (
                <div
                  className="profile-line flex flex-col gap-y-3"
                  key={item.id}
                >
                  <div className="flex">
                    <img
                      src={item.avatar}
                      alt="Profile 1"
                      className="w-8 h-8 rounded-full mr-2 border-2 border-blue-500"
                    />
                    <h1>{item.name}</h1>
                  </div>
                  <div className="border-t border-gray-300"></div>
                </div>
              ))}
            </div>
            <button className="bg-sky-500 hover:bg-sky-600 rounded-lg px-3 py-2 text-white font-semibold">
              Add
            </button>
          </div>
        </div>
        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPermission;

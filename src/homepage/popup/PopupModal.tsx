import React from "react";
import Avatar from "../../assets/Avatar.png";
import { MdClear } from "react-icons/md";
import Avatar1 from "../../assets/userProfile/Avatar-1.png";
import Avatar2 from "../../assets/userProfile/Avatar-2.png";
import Avatar3 from "../../assets/userProfile/Avatar-3.png";
import Avatar4 from "../../assets/userProfile/Avatar-4.png";

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const clearIcons = {
  color: "white",
  fontSize: "20px",
};

const PopupModal: React.FC<PopupModalProps> = ({ isOpen, onClose }) => {
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
          <div className="role flex flex-col gap-y-5">
            <div className="font-bold text-lg text-sky-500">Role</div>
            <div className="line border border-gray-200"></div>
            <div className="admins flex flex-row items-center justify-between">
              <span className="mr-2 font-bold">Admins</span>
              <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-5 rounded-full">
                Add
              </button>
            </div>
            <div className="admin-profile flex gap-x-3">
              <div className="admin-1 flex items-center border border-sky-500 rounded-full px-1 py-0">
                <img src={Avatar} alt="Profile 1" className="w-10 h-10" />
                <span className="text-sky-500">TED</span>
              </div>
              <div className="admin-2 flex justify-center items-center border border-sky-500 rounded-full px-1 py-0 gap-x-1">
                <img src={Avatar1} alt="Profile 1" className="w-10 h-10" />
                <span className="text-sky-500">Neath</span>
                <MdClear
                  style={clearIcons}
                  className="bg-sky-500 rounded-full"
                />
              </div>
            </div>
            <div className="line border border-gray-200"></div>
            <div className="pollers flex flex-row items-center justify-between">
              <span className="mr-2 font-bold">Pollers</span>
              <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-5 rounded-full">
                Add
              </button>
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
              <div className="poller-3 flex justify-center items-center border border-sky-500 rounded-full px-1 py-0 gap-x-1">
                <img src={Avatar4} alt="Profile 1" className="w-10 h-10" />
                <span className="text-sky-500">Bunchhean</span>
                <MdClear
                  style={clearIcons}
                  className="bg-sky-500 rounded-full"
                />
              </div>
            </div>
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

export default PopupModal;

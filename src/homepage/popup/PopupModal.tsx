import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import RoleSection from "../../components/RoleSection";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Member {
  avatarSrc?: string;
  username: string;
  id: number;
}

const clearIcons = {
  color: "white",
  fontSize: "20px",
};

const PopupModal: React.FC<PopupModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Get datas from current active community to display on UI
  const currentCommunity = useSelector((state: RootState) => state.community);

  const defaultPollers = currentCommunity.communityMembers.filter(
    (obj) => obj.role === "poller"
  );

  const defaultAdmins = currentCommunity.communityMembers.filter(
    (obj) => obj.role === "admin"
  );

  // Set state for each role section
  const [pollers, setPollers] = useState<Member[]>(defaultPollers);
  const [admins, setAdmins] = useState<Member[]>(defaultAdmins);

  function onButtonClick() {
    //
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 transition-opacity">
        <div
          className="absolute inset-0 bg-gray-500 opacity-60"
          onClick={onClose}
        ></div>
      </div>
      <div
        className="flex flex-col justify-start bg-white rounded-lg text-center overflow-hidden shadow-xl px-6 transform transition-all w-full lg:w-2/5  h-full lg:h-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="bg-white py-6">
          <div className="role flex flex-col gap-y-5">
            <div className="text-xl text-sky-500">
              <h1>Role</h1>
              <button className="absolute top-6 right-5" onClick={onClose}>
                <RxCrossCircled className="w-7 h-7 text-gray-400 hover:text-blue-custom" />
              </button>
            </div>
            <div className="line border border-gray-200"></div>
            <RoleSection
              role="Admins"
              members={admins}
              clearIconsStyle={clearIcons}
              onClearClick={onButtonClick}
              onAddClick={onButtonClick}
              setAdmins={setAdmins}
            />
            <div className="line border border-gray-200"></div>
            <RoleSection
              role="Pollers"
              members={pollers}
              clearIconsStyle={clearIcons}
              onClearClick={onButtonClick}
              onAddClick={onButtonClick}
              setPollers={setPollers}
            />
          </div>
        </div>
        {/* <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Close
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default PopupModal;

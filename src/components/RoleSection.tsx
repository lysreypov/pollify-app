import React from "react";
import ButtonWithAvatar from "./ButtonWithAvatar";
import Avatar1 from "../assets/userProfile/Avatar-1.png";
import api from "../utils/api";

interface Member {
  avatarSrc?: string;
  username: string;
  id: number;
}

interface AdminsSectionProps {
  role: string;
  members: Member[];
  clearIconsStyle: React.CSSProperties;
  onClearClick: () => void;
  onAddClick: () => void;
  setPollers?: React.Dispatch<React.SetStateAction<Member[]>>;
  setAdmins?: React.Dispatch<React.SetStateAction<Member[]>>;
}

const RoleSection: React.FC<AdminsSectionProps> = ({
  role,
  members,
  clearIconsStyle,
  onClearClick,
  onAddClick,
  setPollers,
  setAdmins,
}) => {
  return (
    <>
      <div className="admins flex flex-row items-center justify-between">
        <span className="mr-2 font-bold">{role}</span>
        <button
          className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-5 rounded-full"
          onClick={onAddClick}
        >
          Add
        </button>
      </div>
      <div className="admin-profile flex flex-wrap gap-2 flex-row w-auto overflow-auto h-20">
        {members.map((member, index) => (
          <ButtonWithAvatar
            key={index}
            role={role}
            id={member.id}
            avatarSrc={member.avatarSrc || Avatar1}
            name={member.username}
            clearIconsStyle={clearIconsStyle}
            onClearClick={onClearClick}
            setAdmins={setAdmins}
            setPollers={setPollers}
          />
        ))}
      </div>
    </>
  );
};

export default RoleSection;

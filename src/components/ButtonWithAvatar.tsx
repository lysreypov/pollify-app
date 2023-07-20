import React from "react";
import { TiDelete } from "react-icons/ti";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import api from "../utils/api";

interface Member {
  avatarSrc?: string;
  username: string;
  id: number;
}

interface ButtonWithAvatarProps {
  id: number;
  avatarSrc: string;
  name: string;
  role: string;
  clearIconsStyle: React.CSSProperties;
  onClearClick: () => void;
  setPollers?: React.Dispatch<React.SetStateAction<Member[]>>;
  setAdmins?: React.Dispatch<React.SetStateAction<Member[]>>;
}

const ButtonWithAvatar: React.FC<ButtonWithAvatarProps> = ({
  avatarSrc,
  name,
  clearIconsStyle,
  onClearClick,
  id,
  role,
  setPollers,
  setAdmins,
}) => {
  // Grabbing the community Id
  const { inCommunityId } = useSelector((state: RootState) => state.community);

  const demoteMember = async (id: number) => {
    // Grabbing the access token
    const accessToken = localStorage.getItem("accessToken");
    try {
      const headers = {
        Authorization: `${accessToken}`,
      };

      const body = { id };

      const response = await api.post(
        `/community_members/demote/community/${inCommunityId}`,
        body,
        { headers }
      );

      console.log(response);
      if (response.status === 200) {
        alert("success");
        if (role === "admin") {
          setPollers?.((prev) => [...prev, { id, username: name }]);
          setAdmins?.((prev) => prev?.filter((obj) => obj.id !== id));
        } else {
          setPollers?.((prev) => prev?.filter((obj) => obj.id !== id));
        }

        window.location.reload();
      }
    } catch (error) {
      alert("Please click on the community again!");
      console.error("Error occurred:", error);
    }
  };
  return (
    <div className="flex flex-row items-center pl-1 h-8 space-x-2 w-auto border border-blue-custom rounded-full">
      <div className="bg-gray-200 rounded-full w-6 h-6">
        <span className="font-bold text-sm text-gray-600 uppercase text-center">
          {name[0]}
        </span>
      </div>
      {/* <img src={avatarSrc} alt="Profile" className="w-6 h-6" /> */}
      <span className="text-sky-500">{name}</span>
      <TiDelete
        className="text-blue-custom w-6 h-6"
        onClick={() => demoteMember(id)}
      />
    </div>
  );
};

export default ButtonWithAvatar;

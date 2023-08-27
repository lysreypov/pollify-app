import React from "react";
import Avatar2 from "../../assets/userProfile/Avatar-2.png";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { TiDelete } from "react-icons/ti";
import { RxCrossCircled } from "react-icons/rx";
import { User } from "../../types/redux/community";
import api from "../../utils/api";

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPermission: React.FC<PopupModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const dispatch = useDispatch();

  const { communityMembers } = useSelector(
    (state: RootState) => state.community
  );

  const communityId = localStorage.getItem("communityId");

  // Grabbing the access token
  const accessToken = localStorage.getItem("accessToken");

  let currentCommunityMembers = communityMembers.filter(
    (obj) => obj.role === "poller"
  );

  const [currentMembers, setCurrentMembers] = React.useState<User[]>(
    currentCommunityMembers
  );
  const [currentInvitedMembers, setCurrentInvitedMembers] = React.useState<
    User[]
  >([]);

  const [searchTerm, setSearchTerm] = React.useState("");

  function PromoteMember(user: User, id: number) {
    setCurrentInvitedMembers([...currentInvitedMembers, user]);
    currentCommunityMembers = currentMembers.filter((obj) => obj.id !== id);
    setCurrentMembers(currentCommunityMembers);
  }

  function DemoteMember(user: User, id: number) {
    setCurrentMembers([...currentMembers, user]);
    currentCommunityMembers = currentInvitedMembers.filter(
      (obj) => obj.id !== id
    );
    setCurrentInvitedMembers(currentCommunityMembers);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: `${accessToken}`,
      };
      const roleList: any = [];
      currentInvitedMembers.map((user) => {
        roleList.push({ id: user.id, role: "admin" });
      });
      const body = { roleList };

      const response = await api.post(
        `/community_members/role/community/${communityId}`,
        body,
        { headers }
      );

      console.log(response);
      if (response.status === 200) {
        window.location.reload();
        console.log("Add member successfully");
      }
    } catch (error) {
      alert("failed");
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="h-screen fixed z-20 inset-0 overflow-y-auto flex items-center justify-center">
      <div
        className="fixed z-20 inset-0 bg-gray-500 opacity-60"
        onClick={onClose}
      ></div>
      <div className="fixed z-20 flex flex-col justify-between lg:justify-center items-start bg-white px-6  py-6 w-full h-full lg:h-auto lg:w-2/5 rounded-lg">
        {/* <div className="flex flex-col w-full justify-center items-center">
          <h1 className=" text-blue-custom text-lg mb-4">Add Permission</h1>
          <button className="absolute top-6 right-7">
            <RxCrossCircled className="w-7 h-7 text-gray-400 hover:text-blue-custom" />
          </button>
        </div> */}
        <div className="w-full">
          <div className="flex flex-col w-full justify-center items-center">
            <h1 className=" text-blue-custom text-lg mb-4">
              Add Administration Permission
            </h1>
            <button
              className="absolute top-6 right-4 lg:right-7"
              onClick={onClose}
            >
              <RxCrossCircled className="w-7 h-7 text-gray-400 hover:text-blue-custom" />
            </button>
          </div>
          <span className="text-gray-400">Search User</span>
          <input
            id="search_user"
            className="text-gray-700 mt-2 py-2 px-4 w-full rounded border-2 border-neutral-300 focus:outline-none"
            type="email"
            placeholder="Type email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex flex-col justify-start mt-4">
            <span className="text-gray-400">Pollers</span>
            <div
              id="user"
              className={`flex flex-wrap w-auto gap-2 mt-2 overflow-auto`}
            >
              {currentInvitedMembers.length > 0 &&
                currentInvitedMembers.map((user, index) => {
                  return (
                    <div
                      key={user.id}
                      className="flex flex-row items-center pl-1 h-8 space-x-2 w-auto border border-blue-custom rounded-full"
                    >
                      <img className="w-6 h-6" src={Avatar2} alt="" />
                      <p className="text-sm text-blue-custom">
                        {user.username.split(" ")[0]}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => DemoteMember(user, user.id)}
                      >
                        <TiDelete className="text-blue-custom w-6 h-6" />
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="w-full lg:h-44 mt-4 overflow-auto">
            {/* {currentMembers.length} */}
            {currentMembers
              .filter((user) => {
                return searchTerm.toLowerCase() === ""
                  ? user
                  : user.email.includes(searchTerm.toLowerCase());
              })
              .map((user, index) => {
                return (
                  <React.Fragment key={index}>
                    <button
                      type="button"
                      onClick={(e) => PromoteMember(user, user.id)}
                      className="flex flex-row items-center space-x-3 w-full px-1 py-3 border-b border-gray-300 hover:bg-gray-100"
                    >
                      {/* <img className="w-8 h-8" src={Avatar3} alt="" /> */}
                      <div className="flex justify-center items-center w-8 h-8 bg-gray-200 rounded-full">
                        <span className="text-gray-600 uppercase font-semibold">
                          {user.username[0]}
                        </span>
                      </div>
                      <p className="text-sm text-black-secondary font-medium">
                        {user.username}
                      </p>
                    </button>
                  </React.Fragment>
                );
              })}
          </div>
        </div>

        <button
          onClick={(e) => handleSubmit(e)}
          type="submit"
          className="w-full text-white font-bold bg-blue-custom rounded mt-4 py-3 hover:opacity-70"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddPermission;

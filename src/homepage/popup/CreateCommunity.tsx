import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { TiDelete } from "react-icons/ti";
import { HiOutlineCamera } from "react-icons/hi";
import { RxCrossCircled } from "react-icons/rx";
import avatar2 from "../../assets/userProfile/Avatar-2.png";
import avatar3 from "../../assets/userProfile/Avatar-3.png";
import {
  setCommunityName,
  closeCreateCommunity,
  setUserData,
  setInvitedUsers,
} from "../../redux/slices/Community";
import { User } from "../../types/redux/community";
import { apiURL } from "../../config/config";
import api from "../../utils/api";

function CreateCommunity() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { communityName, userData, invitedUsers } = useSelector(
    (state: RootState) => state.community
  );

  const [communityProfile, setCommunityProfile] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // remove user that has been invited from the list
  const remainingUsers = userData.filter((user) => {
    return !invitedUsers.some((invitedUser) => invitedUser.id === user.id);
  });

  // style
  const height = invitedUsers.length !== 0 ? "h-20" : "h-auto";

  // token
  const accessToken = localStorage.getItem("accessToken");

  const handleUplaodImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      setCommunityProfile(file);
    }
  };

  const handleCommunityNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setCommunityName(e.target.value));
  };

  const handleCloseCreateCommunity = () => {
    console.log("Close");

    // Clear form inputs
    dispatch(setCommunityName(""));
    dispatch(setInvitedUsers([]));
    dispatch(closeCreateCommunity());
  };

  // get data all users data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURL}/user/all`, {
          headers: {
            Authorization: `${accessToken}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          const updatedData = userData.map(
            ({
              id,
              username,
              email,
            }: {
              id: number;
              username: string;
              email: string;
            }) => ({
              id,
              username,
              email,
            })
          );

          dispatch(setUserData(updatedData));
        }
      } catch (error) {
        console.error("An error occurred: ", error);
      }
    };
    fetchData();
  }, []);

  const handleAddUser = (
    e: React.MouseEvent<HTMLButtonElement>,
    user: User
  ): void => {
    if (!invitedUsers.some((invitedUser) => invitedUser.id === user.id)) {
      const updatedInvitedUsers = [...invitedUsers, user];
      dispatch(setInvitedUsers(updatedInvitedUsers));

      // clear user input
      setSearchTerm("");
    }
  };

  const handleRemoveUser = (
    e: React.MouseEvent<HTMLButtonElement>,
    user: User
  ): void => {
    const updatedInvitedUsers = invitedUsers.filter(
      (invitedUser) => invitedUser.id !== user.id
    );
    dispatch(setInvitedUsers(updatedInvitedUsers));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const userId = invitedUsers.map((user) => user.id);

    const formData = new FormData();
    formData.append("communityName", communityName);
    formData.append("userId", userId.join(","));
    if (communityProfile) {
      formData.append("file", communityProfile);
    }
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `${accessToken}`,
      "Content-Type": "multipart/form-data",
    };

    try {
      const response = await api.post("/community", formData, { headers });
      console.log("responst", response);

      if (response.status === 200) {
        console.log("Create Community Success");
        // Refresh the page after successfully creating the community
        window.location.reload();

        // Clear form inputs
        dispatch(setCommunityName(""));
        dispatch(setInvitedUsers([]));
        dispatch(closeCreateCommunity());
      }
    } catch (error) {
      alert("Cannot create community");
      console.log("Cannot create community", error);
    }
  };

  return (
    <div className="h-screen relative lg:fixed z-20 lg:inset-0 overflow-y-auto flex lg:items-center lg:justify-center">
      <div
        className="relative lg:fixed z-20 lg:inset-0 bg-gray-500 opacity-60"
        onClick={handleCloseCreateCommunity}
      ></div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="fixed z-20 flex flex-col justify-between lg:justify-center items-start bg-white px-6 py-6 w-full h-full lg:h-auto lg:w-2/5 rounded-lg"
        >
          <div className="flex flex-col w-full justify-center items-center">
            <h1 className=" text-blue-custom text-lg mb-4">
              Create New Community
            </h1>
            <button
              className="absolute top-6 right-4 lg:right-5"
              onClick={handleCloseCreateCommunity}
            >
              <RxCrossCircled className="w-7 h-7 text-gray-400 hover:text-blue-custom" />
            </button>
            <div className="">
              <label
                className="flex justify-center items-center bg-blue-custom bg-opacity-10 rounded-full border border-blue-custom cursor-pointer w-20 h-20"
                htmlFor="uploadProfile"
              >
                {communityProfile ? (
                  <img
                    src={URL.createObjectURL(communityProfile)}
                    alt="Selected Profile"
                    className="w-full h-full object-cover rounded-full border border-blue-custom"
                  />
                ) : (
                  <HiOutlineCamera className="text-blue-custom w-12 h-12 stroke-1 " />
                )}
              </label>
              <input
                id="uploadProfile"
                name="uploadProfile"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUplaodImage}
                required
              />
            </div>

            <input
              className="text-gray-700 text-center w-full py-3 px-4 focus:outline-none"
              type="text"
              value={communityName}
              placeholder="Community Name..."
              onChange={handleCommunityNameChange}
              required
            />
          </div>
          <div className="w-full">
            <span className="text-gray-400">Search</span>
            <input
              id="search_user"
              className="text-gray-700 mt-2 py-2 px-4 w-full rounded border-2 border-neutral-300 focus:outline-none"
              type="email"
              placeholder="Type email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-col justify-start mt-3">
              <span className="text-gray-400">Invite to Community</span>
              <div
                id="user"
                className={`flex flex-wrap w-auto ${height} gap-2 mt-2 overflow-auto`}
              >
                {invitedUsers.map((user, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="flex flex-row items-center pl-1 h-8 space-x-2 w-auto border border-blue-custom rounded-full ">
                        <img className="w-6 h-6" src={avatar2} alt="" />
                        <p className="text-sm text-blue-custom">
                          {user.username}
                        </p>
                        <button
                          type="button"
                          onClick={(e) => handleRemoveUser(e, user)}
                        >
                          <TiDelete className="text-blue-custom w-6 h-6" />
                        </button>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-full mt-2 lg:h-44 overflow-auto">
            {remainingUsers
              .filter((user) => {
                return searchTerm.toLowerCase() === ""
                  ? user
                  : user.email.toLowerCase().includes(searchTerm.toLowerCase());
              })
              .map((user, index) => {
                return (
                  <React.Fragment key={index}>
                    <button
                      type="button"
                      className="flex flex-row items-center space-x-3 w-full px-1 py-3 border-b border-gray-300 hover:bg-gray-100"
                      onClick={(e) => handleAddUser(e, user)}
                    >
                      <img className="w-8 h-8" src={avatar3} alt="" />
                      <p className="text-sm text-black-secondary font-medium">
                        {user.username}
                      </p>
                    </button>
                  </React.Fragment>
                );
              })}
          </div>
          <button
            type="submit"
            className="w-full text-white font-bold bg-blue-custom rounded mt-4 py-3 hover:opacity-70"
          >
            Create
          </button>
        </form>
      )}
    </div>
  );
}

export default CreateCommunity;

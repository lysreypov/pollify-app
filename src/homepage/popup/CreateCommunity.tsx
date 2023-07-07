import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { TiDelete } from "react-icons/ti";
import { HiOutlineCamera } from "react-icons/hi";
import { RxCrossCircled } from "react-icons/rx";
import avatar2 from "../../assets/userProfile/Avatar-2.png";
import avatar3 from "../../assets/userProfile/Avatar-3.png";
import {
  setUserProfile,
  setCommunityName,
  setSearchTerm,
  closeCreateCommunity,
  setUserData,
  setInvitedUsers,
} from "../../redux/slices/Community";
import { User } from "../../types/redux/community";
import { apiURL, accessToken } from "../../config/config";

function CreateCommunity() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    userProfile,
    communityName,
    communityDescription,
    searchTerm,
    userData,
    invitedUsers,
  } = useSelector((state: RootState) => state.community);

  // style
  const height = invitedUsers.length !== 0 ? "h-20" : "h-auto";

  const handleUplaodImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    console.log("Upload", file);
    // error
    if (file) {
      dispatch(setUserProfile(file));
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
        const response = await fetch(`${apiURL}/api/v1/user/all`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
      dispatch(setSearchTerm(""));
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
    const communityData = {
      communityName,
      communityDescription,
      userId,
    };

    const createCommunity = async () => {
      try {
        const response = await fetch(`${apiURL}/api/v1/community`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(communityData),
        });

        if (response.ok) {
          console.log("Create Community Success");
          // Refresh the page after successfully creating the community
          window.location.reload();

          // Clear form inputs
          dispatch(setCommunityName(""));
          dispatch(setInvitedUsers([]));
          dispatch(closeCreateCommunity());
        }
      } catch (error) {
        console.log("An error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    };

    createCommunity();
  };

  return (
    <div className="h-screen fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div
        className="fixed z-10 inset-0 bg-gray-500 opacity-60"
        onClick={handleCloseCreateCommunity}
      ></div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="fixed z-20 flex flex-col justify-center items-start bg-white px-4 sm:px-8 py-6 w-full h-auto md:w-5/6 lg:w-2/5 rounded-lg"
        >
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
              value={communityName}
              placeholder="Community Name..."
              onChange={handleCommunityNameChange}
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
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
          </div>
          <div className="flex flex-col justify-start mt-4">
            <span className="text-gray-400">Invite to Community</span>
            <div
              id="user"
              className={`flex flex-wrap w-auto ${height} gap-2 mt-2 overflow-auto`}
            >
              {invitedUsers.map((user, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="flex flex-row items-center pl-1 h-8 space-x-2 w-auto border border-blue-custom rounded-full">
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
          <div className="w-full mt-6 h-44 overflow-auto">
            {userData
              .filter((user) => {
                return searchTerm.toLocaleLowerCase() === ""
                  ? user
                  : user.email.includes(searchTerm);
              })
              .map((user, index) => {
                return (
                  <React.Fragment key={index}>
                    <button
                      type="button"
                      className="flex flex-row items-center space-x-3 w-full px-1 py-3 border-b border-gray-300"
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

import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import Poll1 from "./Poll1";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { openCreatePollPopup } from "../../../redux/slices/CreatePoll";
import {
  setIsBackToCommunity,
  setIsCommunityProfileOpen,
} from "../../../redux/slices/Community";
import { NoPoll } from "../../../homepage";
import TrophyIcon from "../../../assets/icons/trophy.svg";
import { Poll } from "../../../types/redux/create_poll";
import api from "../../../utils/api";

function CreatePoll() {
  const dispatch = useDispatch();

  // search poll
  const [searchTerm, setSearchTerm] = useState("");

  // Check Access Right
  const [hasAccess, setHasAccess] = useState(false);

  // fetched poll state
  const [polls, setPolls] = useState<Poll[]>([]);

  const { username, community, id } = useSelector(
    (state: RootState) => state.userCommunity
  );

  const { communityMembers, isBackToCommunity } = useSelector(
    (state: RootState) => state.community
  );

  const communityId = localStorage.getItem("communityId");

  const inActiveCommunity =
    communityId !== null
      ? community.find((obj) => obj.id.toString() === communityId.toString())
      : null;

  const currentProfile = communityMembers.find((member) => member.id === id);

  const handleCommunityProfileClick = () => {
    dispatch(setIsCommunityProfileOpen(true));
  };

  const handleCreatePoll = () => {
    console.log("Create Poll Clicked");
    dispatch(openCreatePollPopup());
  };

  const handleBackToCommunity = () => {
    dispatch(setIsBackToCommunity(true));
  };

  useEffect(() => {
    const fetchPolls = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `${accessToken}`,
      };
      try {
        const response = await api.get(`/poll/community/${communityId}`, {
          headers,
        });
        if (response.status === 200) {
          const pollData = response.data.reverse();
          setPolls(pollData);

          sessionStorage.setItem("pollData", JSON.stringify(pollData));
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchPolls();
  }, [communityId]);

  // Checking Access Right
  useEffect(() => {
    if (currentProfile?.role === "admin" || currentProfile?.role === "owner") {
      setHasAccess(true);
    } else {
      setHasAccess(false);
    }
  }, [hasAccess, communityMembers]);
  console.log("back", isBackToCommunity);

  return (
    <div
      className={`${
        isBackToCommunity ? "hidden " : ""
      } bg-gray-100 w-full lg:w-full lg:flex lg:flex-col md:w-screen sm:w-full font-san min-h-screen`}
    >
      <div className="bg-white flex flex-col pl-6 pr-7 py-6 gap-y-7">
        <div className="logo-profile-createPoll flex justify-between items-center">
          <div className="logo-text">
            <p className="whitespace-normal text-lg hidden text-gray-700 lg:block">
              Welcome to Pollify
              <span className="text-blue-custom font-bold uppercase">
                {" "}
                {username}{" "}
              </span>
              !
            </p>

            <div
              className="flex items-center gap-x-2 lg:hidden cursor-pointer"
              onClick={handleBackToCommunity}
            >
              <IoIosArrowBack className="w-6 h-6 text-blue-custom" />
              <span className="text-lg">Communities</span>
            </div>
          </div>
          <div className="translate flex gap-x-3 items-center lg:hidden">
            {inActiveCommunity?.image === null ? (
              <div
                className="flex justify-center items-center w-10 h-10 rounded-full border border-blue-500 cursor-pointer"
                onClick={handleCommunityProfileClick}
              >
                <span className="font-bold text-xl uppercase">
                  {inActiveCommunity?.name[0]}
                </span>
              </div>
            ) : (
              <div
                className="relative cursor-pointer"
                onClick={handleCommunityProfileClick}
              >
                <img
                  src={inActiveCommunity?.image}
                  alt="community profile"
                  className="w-9 h-9 rounded-full border-2 border-blue-500"
                />
              </div>
            )}
          </div>
        </div>
        <div className="create-poll w-full flex flex-row justify-around items-center gap-x-3">
          <div className="search-field relative w-11/12 flex">
            <div className="w-full absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AiOutlineSearch className="text-blue-custom w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search Poll"
              className="py-2 px-4 pl-9 border-2 border-gray-300 w-full rounded-full focus:outline-none focus:border-blue-500"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>

          {hasAccess && (
            <button
              onClick={handleCreatePoll}
              className="bg-blue-custom hover:opacity-70 text-white whitespace-nowrap rounded-full px-4 py-2.5 cursor-pointer"
            >
              Create Poll
            </button>
          )}
          {/* <div className="flex justify-center items-center border border-blue-custom rounded-full w-14 h-12">
            <img className="w-8 h-8" src={TrophyIcon} alt="Trophy" />
          </div> */}
        </div>
        {/* {isCreatePollPopupOpen && <CreatePollPopup />} */}
      </div>
      <div className="flex flex-col h-[75vh] overflow-auto p-6 home-scrolling">
        {polls?.length > 0 ? (
          <div className="flex flex-col gap-y-5">
            {polls
              .filter((poll) => {
                return searchTerm.toLowerCase() === ""
                  ? poll
                  : poll.pollQuestion
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());
              })
              .map((poll: any) => (
                <Poll1
                  key={poll.id}
                  votedOn={poll.votedOn}
                  pollId={poll.id}
                  createdBy={poll.user.createdBy}
                  pollDate={poll.user.createdAt}
                  options={poll.options}
                  pollQuestion={poll.pollQuestion}
                />
              ))}
          </div>
        ) : (
          <NoPoll />
        )}
      </div>
    </div>
  );
}

export default CreatePoll;

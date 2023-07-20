import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import {
  setInCommunityId,
  setIsBackToCommunity,
  setSearchTerm,
} from "../../../redux/slices/Community";

interface Community {
  id: number;
  name: string;
  image: string;
}

function UserCommunity() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { community } = useSelector((state: RootState) => state.userCommunity);

  const { searchTerm } = useSelector((state: RootState) => state.community);

  const activeCommunityId = localStorage.getItem("communityId");

  const handleCommunityClick = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>,
    community: Community
  ): void => {
    e.preventDefault();
    dispatch(setInCommunityId(community.id));
    dispatch(setIsBackToCommunity(false));
    dispatch(setSearchTerm(""));
    localStorage.setItem("communityId", `${community.id}`);

    navigate(`/community/${community.id}`);
  };

  return (
    <div className="profile flex flex-col pt-2 gap-y-2 mt-3 mr-1 h-[50vh] sm:h-full  overflow-y-auto community-scrolling">
      {community
        .filter((community) => {
          return searchTerm.toLowerCase() === ""
            ? community
            : community.name.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .map((community: any, index: any) => {
          return (
            <React.Fragment key={index}>
              <div
                className={`relative flex items-center cursor-pointer py-2 px-4 gap-x-3 hover:bg-blue-100 ${
                  activeCommunityId === community.id &&
                  "bg-blue-100 transform -skew-x-0"
                }`}
                key={community.id}
                onClick={(e) => handleCommunityClick(e, community)}
              >
                {activeCommunityId === community.id && (
                  <div className="absolute w-2 h-full left-0 rounded-tr-lg rounded-br-lg bg-gradient-to-b from-cyan-400 to-blue-500 opacity-70"></div>
                )}
                {community.image === null ? (
                  <div className="flex justify-center items-center w-10 h-10 rounded-full border border-blue-500">
                    <span className="font-bold text-xl uppercase">
                      {community.name[0]}
                    </span>
                  </div>
                ) : (
                  <img
                    src={community.image}
                    alt={`Community ${community.id}`}
                    className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
                  />
                )}
                <h1>{community.name}</h1>
              </div>
            </React.Fragment>
          );
        })}
    </div>
  );
}

export default UserCommunity;

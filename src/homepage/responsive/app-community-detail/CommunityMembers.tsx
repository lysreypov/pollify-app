import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import { User } from "../../../types/redux/community";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { setCommunityMembers } from "../../../redux/slices/Community";
import Avatar1 from "../../../assets/userProfile/Avatar-1.png";

function CommunityMembers() {
  const dispatch = useDispatch();

  const { communityMembers } = useSelector(
    (state: RootState) => state.community
  );

  const communityId = localStorage.getItem("communityId");

  useEffect(() => {
    const fetchCommunityMembers = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `${accessToken}`,
      };
      // if (inCommunityId !== 0) {
      try {
        const response = await api.get(
          `/community_members/community/${communityId}`,
          {
            headers,
          }
        );
        if (response.status === 200) {
          const communityMembersData = response.data.user;
          dispatch(setCommunityMembers(communityMembersData));
        }
      } catch (error) {
        console.log("An error occured: ", error);
      }
      // }
    };

    fetchCommunityMembers();
  }, [communityId]);

  return (
    <div className="profile flex flex-col h-[25vh] md:h-[40vh] px-4 overflow-y-auto community-scrolling">
      {communityMembers.map((user: any, index: any) => {
        return (
          <React.Fragment key={index}>
            <div className="profile-line flex flex-col justify-center border-b border-gray-300 py-4">
              <div className="flex items-center">
                {/* <img
                  src={user.avatar}
                  alt="Profile 1"
                  className="w-8 h-8 rounded-full mr-2 border-2 border-blue-500"
                /> */}
                <div className="flex justify-center items-center w-10 h-10 rounded-full mr-2 border border-blue-500">
                  <span className="font-bold text-xl uppercase">
                    {user.username.slice(0, 2)}
                  </span>
                </div>
                <h1>{user.username}</h1>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default CommunityMembers;

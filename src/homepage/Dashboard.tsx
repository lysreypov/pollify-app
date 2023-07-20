import React, { useEffect } from "react";
import CreatePoll from "./responsive/app-community/CreatePoll";
import Community from "./responsive/app/Community";
import CommunityProfile from "./responsive/app-community-detail/CommunityProfile";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CreateCommunity from "../homepage/popup/CreateCommunity";
import CreatePollPopup from "./popup/CreatePollPopup";

function Dashboard2() {
  const { isCreateCommunityOpen } = useSelector(
    (state: RootState) => state.community
  );
  const isCreatePollPopupOpen = useSelector(
    (state: RootState) => state.createPoll.isCreatePollPopupOpen
  );

  return (
    <div className="flex flex-row bg-white text-gray-500 w-screen h-screen overflow-hidden">
      {isCreateCommunityOpen && <CreateCommunity />}
      <Community />
      <CreatePoll />
      {isCreatePollPopupOpen && <CreatePollPopup />}
      <CommunityProfile />
    </div>
  );
}

export default Dashboard2;

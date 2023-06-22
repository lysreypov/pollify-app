import React from "react";

import CreatePoll from "./responsive/app-community/CreatePoll";
import Community from "./responsive/app/Community";
import CommunityProfile from "./responsive/app-community-detail/CommunityProfile";

function Dashboard2() {
  return (
    <div className="flex flex-row bg-slate-200 w-screen">
      <Community />
      <CreatePoll />
      <CommunityProfile />
    </div>
  );
}

export default Dashboard2;

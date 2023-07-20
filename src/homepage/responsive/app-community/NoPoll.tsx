import React from "react";
import WelcomeIcon from "../../../assets/icons/welcome.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";

const NoPoll = () => {
  const dispatch = useDispatch();
  const { community } = useSelector((state: RootState) => state.userCommunity);
  const { inCommunityId } = useSelector((state: RootState) => state.community);

  const communityId = localStorage.getItem("communityId");

  const inCommunity =
    communityId !== null
      ? community.find((obj) => obj.id.toString() === communityId.toString())
      : null;

  return (
    <div className="flex flex-col justify-center pb-20 items-center px-4 h-full border bg-white rounded-md">
      <div className="w-36 h-36 mb-3">
        <img className="w-full h-full" src={WelcomeIcon} alt="Welcome" />
      </div>
      {community && community.length > 0 ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-2xl text-center">
            Welcome to {inCommunity?.name} Community!
          </h1>
          <small className="text-center">
            This is the beginning of this community. Create poll now.
          </small>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-2xl text-center">
            Let{"'"}s create the best Community
          </h1>
          <small className="text-center">
            Invite your friends to your community and enjoy the journey!
          </small>
        </div>
      )}
    </div>
  );
};

export default NoPoll;

import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import QrCode from "../../../assets/icons/qr-code.svg";
import CommunitySetting from "./CommunitySetting";
import CommunityMembers from "./CommunityMembers";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { setIsCommunityProfileOpen } from "../../../redux/slices/Community";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserProfile } from "../../../components";
import DeleteIcon from "../../../assets/icons/trash.svg";
import api from "../../../utils/api";
import Alert from "../../../components/Popup/Alert";

function CommunityProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasAccess, setHasAccess] = useState(false);
  const { isCommunityProfileOpen } = useSelector(
    (state: RootState) => state.community
  );
  const { id, community } = useSelector(
    (state: RootState) => state.userCommunity
  );
  const { communityMembers } = useSelector(
    (state: RootState) => state.community
  );

  const [isOpenUserProfile, setIsOpenUserProfile] = React.useState(false);

  // Alert popup setup
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<any>("success");

  // Copy link to clipboard
  const copyLink = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `${accessToken}`,
    };

    try {
      const response = await api.post(
        `/community/generate?id=${communityId}`,
        {},
        {
          headers,
        }
      );
      if (response.status === 200) {
        if (response.data.inviteLink !== null) {
          navigator.clipboard
            .writeText(response.data.inviteLink)
            .then(function (x) {
              setAlertType("success");
              setShowAlert(true);
              setAlertMessage("Link is copied to clipboard!");
              setTimeout(function () {
                setShowAlert(false);
              }, 2000);
            });
        }
      }
    } catch (error) {
      console.log("An error occured: ", error);
    }
  };

  // Handle leave community
  const leaveCommunity = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `${accessToken}`,
    };
    api
      .post(
        `/community_members/leave/community/${communityId}`,
        {},
        { headers }
      )
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
          navigate("/community");
        }
      })
      .catch((err) => alert(err));
  };

  // Handle delete community
  const deleteCommunity = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `${accessToken}`,
    };
    api
      .post(`/community/delete/${communityId}`, {}, { headers })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
          navigate("/community");
        }
      })
      .catch((err) => alert(err));
  };

  const { username } = useSelector((state: RootState) => state.userCommunity);
  const location = useLocation();
  // const communityName = location.state?.communityName || "";
  // const communityImage = location.state?.communityImage || "";

  const currentProfile = communityMembers.find((member) => member.id === id);
  const communityId = localStorage.getItem("communityId");

  const inActiveCommunity =
    communityId !== null
      ? community.find((obj) => obj.id.toString() === communityId.toString())
      : null;

  useEffect(() => {
    if (currentProfile?.role === "admin" || currentProfile?.role === "owner") {
      setHasAccess(true);
    } else {
      setHasAccess(false);
    }
  }, [hasAccess, communityMembers]);

  const handleOpenUserProfile = () => {
    setIsOpenUserProfile(!isOpenUserProfile);
  };

  const handleBackToPoll = () => {
    dispatch(setIsCommunityProfileOpen(false));
  };

  return (
    <div
      className={` ${
        isCommunityProfileOpen ? "w-full" : "w-0"
      } absolute z-10 duration-300 right-0 lg:relative font-sans bg-white lg:w-2/6 h-screen lg:flex lg:flex-col overflow-hidden`}
    >
      <Alert variant={alertType} message={alertMessage} showAlert={showAlert} />
      <div className="logo-profile-createPoll flex justify-between lg:justify-end items-center pt-5 px-5">
        <div
          className="flex items-center gap-x-2 lg:hidden cursor-pointer"
          onClick={handleBackToPoll}
        >
          <IoIosArrowBack className="w-6 h-6 text-blue-custom" />
          <span className="text-lg">Polls</span>
        </div>
        <div className="relative translate flex gap-x-3 items-center lg:justify-end cursor-pointer">
          <div className="pr-2">
            {/* <img
              className="w-6 h-6 text-gray-500"
              src={NotificationIcon}
              alt="Notification Icon"
            /> */}
          </div>
          <div
            className="flex gap-x-3 items-center hover:text-blue-custom"
            onClick={handleOpenUserProfile}
          >
            <p className="hidden lg:block lg:font-sans lg:font-bold uppercase">
              {username}
            </p>
            <div className="relative">
              {/* <img
              src={Avatar}
              alt="Profile 1"
              className="w-10 h-10 rounded-full mr-2 border-2 border-blue-500"
            /> */}
              <div className="flex justify-center items-center w-10 h-10 rounded-full lg:mr-2 border border-blue-500">
                <span className="font-bold text-xl uppercase">
                  {username.slice(0, 2)}
                </span>
              </div>
              <span className="bottom-1 left-8 absolute w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
            </div>
          </div>
          {isOpenUserProfile && <UserProfile />}
        </div>
      </div>
      <div className="border border-gray-200 mt-8 lg:hidden"></div>
      {/* <div className="Moringa flex flex-col gap-y-3 mt-12 justify-center items-center">
        <img
          src={communityImage}
          alt="moringa"
          className="w-16 h-16 rounded-full mr-2 border border-blue-custom cursor-pointer"
        />
        <h1 className="text-[15px]">{communityName}</h1>
        <div className="flex justify-center items-center gap-x-4">
          <div className="flex justify-center items-center w-10 h-10 p-1 bg-blue-100 rounded-lg">
            <img className="w-full h-full" src={QrCode} alt="QR Code Icon" />
          </div>
        </div>
      </div> */}

      {communityId && (
        <div className="">
          <div className="Moringa flex flex-col gap-y-3 mt-12 justify-center items-center">
            <div className="flex flex-col items-center gap-y-2">
              {inActiveCommunity?.image === null ? (
                <div className="flex justify-center items-center w-16 h-16 rounded-full border border-blue-500 cursor-pointer">
                  <span className="font-bold text-4xl uppercase">
                    {inActiveCommunity?.name[0]}
                  </span>
                </div>
              ) : (
                <img
                  src={inActiveCommunity?.image}
                  alt="community profile"
                  className="w-16 h-16 rounded-full object-cover border border-blue-custom cursor-pointer"
                />
              )}
              <h1 className="text-lg text-center">{inActiveCommunity?.name}</h1>
            </div>
            <div className="flex justify-center items-center gap-x-4 mb-3">
              <div className="flex justify-center items-center w-10 h-10 p-1 bg-blue-100 rounded-lg">
                <img
                  className="w-full h-full"
                  src={QrCode}
                  alt="QR Code Icon"
                />
              </div>
              <button
                onClick={() => copyLink()}
                id="copyButton"
                type="button"
                className="bg-blue-custom hover:opacity-70 text-white font-bold py-2 px-5 rounded-lg"
              >
                Copy Link
              </button>
            </div>
          </div>
          {/* <PopupModal isOpen={isOpen} onClose={closeModal} /> */}
          <div className="mb-2">{hasAccess && <CommunitySetting />}</div>

          <div className="flex flex-col gap-y-5 mt-4 px-4 border-t py-5">
            <div
              onClick={() => {
                if (currentProfile?.role !== "owner") {
                  leaveCommunity();
                } else {
                  deleteCommunity();
                }
              }}
              className="flex justify-start items-center gap-x-4 cursor-pointer"
            >
              <div>
                <img
                  className="w-6 h-6 text-gray-500"
                  src={DeleteIcon}
                  alt="Users Icon"
                />
              </div>

              <h1>
                {currentProfile?.role === "owner"
                  ? "Leave and Delete"
                  : "Leave"}
              </h1>
            </div>
          </div>

          <div className="border-t"></div>
          <div className="pl-4 pt-4">
            <span className="mt-4">Current Members</span>
          </div>

          <div className="mr-1 overflow-y-auto community-scrolling">
            <CommunityMembers />
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunityProfile;

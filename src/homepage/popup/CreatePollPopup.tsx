import React, { ReactEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCreatePollPopup } from "../../redux/slices/CreatePoll";
import Avatar from "../../assets/Avatar.png";
import PolliFy from "../../assets/PolliFy.png";
import { MdTranslate } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuWrapText } from "react-icons/lu";
import { RootState } from "../../redux/store";
import { RxCrossCircled } from "react-icons/rx";
// import Dropdown from "react-dropdown-select";
import api from "../../utils/api";

const CreatePollPopup = () => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState<string[]>([]);
  const [pollQuestion, setPollQuestion] = useState<string>("");
  const [newOption, setNewOption] = useState<string>("");
  const [limitVote, setLimitVote] = useState<string | number>(1);
  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const [durationError, setDurationError] = useState("");
  const [error, setError] = useState("");
  const communityId = useSelector(
    (state: RootState) => state.community.inCommunityId
  );

  // Grabbing the access token
  const accessToken = localStorage.getItem("accessToken");

  //giving input, add, delete options
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewOption(event.target.value);
  };

  const handleOptionAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (newOption.trim() !== "") {
      setOptions((prevOptions: string[]) => [...prevOptions, newOption]);
      setNewOption("");
    }
  };

  const handleOptionDelete = (index: number) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };
  //

  //close popup
  const handleClosePoll = () => {
    console.log("close pop up");
    dispatch(closeCreatePollPopup());
  };
  //

  // const handleVoteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setLimitVote(parseInt(event.target.value));
  // };

  const handleLimitVoteChange = (
    selectedOption: { value: string | number }[]
  ) => {
    const value = selectedOption[0]?.value;
    if (value === "custom") {
      setLimitVote("");
    } else {
      setLimitVote(value);
    }
  };

  const handleCustomLimitVoteChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setLimitVote(value);
    } else {
      throw new Error("Custom limit vote must be a number");
    }
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDuration(event.target.value); // Update the duration state
    setDurationError(""); // Reset the duration error message
  };

  //process duration here

  const handleProcessFormData = () => {
    const currentTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Bangkok",
    });

    let durationToOffset;
    const minutes = parseInt(selectedDuration);

    if (isNaN(minutes) || minutes < 0) {
      setDurationError("Please enter a positive number of minutes.");
      return null;
    }

    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      durationToOffset = `+0${7 + hours}:`;
      if (remainingMinutes < 10) {
        durationToOffset += `0${remainingMinutes}`;
      } else {
        durationToOffset += remainingMinutes;
      }
    } else if (minutes < 10) {
      durationToOffset = `+0${7}:0${minutes}`;
    } else {
      durationToOffset = `+0${7}:${minutes}`;
    }

    const duration = new Date(currentTime)
      .toISOString()
      .replace("Z", durationToOffset);

    const pollData = {
      pollQuestion,
      limitVote,
      duration,
      options,
    };

    return pollData;
  };

  //handle poll question, limit vote, duration
  const handlePollQuestionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPollQuestion(event.target.value);
  };

  const handleVoteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLimitVote(parseInt(event.target.value));
  };

  const handleCreatePoll = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pollData = handleProcessFormData();
    const headers = {
      Authorization: `${accessToken}`,
    };

    try {
      const response = await api.post(
        `/poll/community/${communityId}`,
        pollData,
        {
          headers,
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log("Create Poll Success");
        // Refresh the page after successfully creating poll
        window.location.reload();

        // Clear form inputs
        dispatch(closeCreatePollPopup());
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="h-screen relative lg:fixed z-20 lg:inset-0 overflow-y-auto flex lg:items-center lg:justify-center">
      {/* <div className="logo-profile-createPoll flex justify-between items-center mt-5 ml-5 mr-5 md:hidden lg:hidden lg:justify-end">
        <div>
          <img src={PolliFy} alt='Profile 1' className='logo w-fit h-7' />
        </div>
        <div className='translate flex gap-x-2 pl-6 items-center sm:gap-x-3 lg:gap-x-5 lg:justify-end'>
          <MdTranslate className='w-6 h-6' />
          <IoMdNotificationsOutline className='w-6 h-6' />
          <h1 className='lg:text-[17px] lg:font-sans lg:font-bold'>TED</h1>
          <div className='relative'>
            <img
              src={Avatar}
              alt='Profile 1'
              className='w-8 h-8 rounded-full mr-2 border-2 border-blue-500'
            />
            <span className='bottom-0 left-6 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full'></span>
          </div>
        </div>
      </div>
      <div className="border border-gray-100 ml-5 mr-5 hd:hidden"></div> */}

      {/* The form */}
      <div className="h-screen fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
        <div
          className="fixed z-10 inset-0 bg-gray-500 opacity-60"
          onClick={handleClosePoll}
        ></div>
        <form
          onSubmit={handleCreatePoll}
          className="w-full h-full lg:h-auto flex flex-col justify-center items-center fixed z-20 bg-white p-6 md:rounded-md md:shadow-md lg:w-2/5 lg:shadow-md"
        >
          <button
            className="absolute top-6 right-4 lg:right-7"
            onClick={handleClosePoll}
          >
            <RxCrossCircled className="w-7 h-7 text-gray-400 hover:text-blue-custom" />
          </button>
          <div className="w-full flex justify-center items-center">
            <h1 className="text-blue-custom text-lg">Create Poll</h1>
          </div>
          <div className="w-full flex items-start pb-1">
            <label className="text-gray-300 text-sm" htmlFor="question">
              Question
            </label>
          </div>
          <input
            type="text"
            id="question"
            placeholder="Add question"
            value={pollQuestion}
            onChange={handlePollQuestionChange}
            className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <br />

          <div className="w-full flex items-start pb-1">
            <label className="text-gray-300 text-sm" htmlFor="question">
              Poll Options
            </label>
          </div>
          <div className="w-full border rounded-md border-gray-300">
            {options.map((option, index) => (
              <div
                key={index}
                className="w-full flex items-start border border-gray-100 relative"
              >
                <div className="w-full px-3 py-2 ">{option}</div>

                {options.map((option, index) => (
                  <div key={index}>
                    <LuWrapText
                      onClick={() => handleOptionDelete(index)}
                      className="absolute right-0 top-1 mr-3 mt-2"
                    />
                  </div>
                ))}
              </div>
            ))}
            <div className="w-full flex relative">
              <input
                type="text"
                id="question"
                value={newOption}
                onChange={handleOptionChange}
                placeholder="Add Option"
                className="w-full px-2 py-2 border border-gray-100 focus:outline-none focus:border-blue-500"
              />
              <button
                className="w-30 text-center absolute right-0 top-1 p-1 mr-3"
                onClick={handleOptionAdd}
              >
                +
              </button>
            </div>
          </div>

          <br />
          <div className="w-full flex items-start pb-1">
            <label className="text-gray-300 text-sm" htmlFor="choose">
              Let user choose
            </label>
          </div>
          <select
            id="choose"
            className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={limitVote}
            onChange={handleVoteChange}
          >
            <option value="1">1 Option</option>
            <option value="2">2 Option</option>
            <option value="3">3 Option</option>
          </select>
          <br />
          <div className="w-full flex items-start pb-1">
            <label className="text-gray-300 text-sm" htmlFor="limit">
              Time Limit
            </label>
          </div>
          <input
            type="text"
            id="duration"
            placeholder="Add poll duration"
            value={selectedDuration}
            onChange={handleDurationChange}
            className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          {durationError && (
            <p className="text-red-500 mb-2">{durationError}</p>
          )}

          <br />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-custom hover:opacity-70 text-white px-6 py-3 rounded-lg text-lg font-semibold"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreatePollPopup;

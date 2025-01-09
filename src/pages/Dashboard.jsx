import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner"; // Import your Spinner component
import { getCurrentUser, reset } from "../redux/auth/auth.slice";

const Dashboard = () => {
  const [addOn, setAddOn] = useState(false);
  const [secretFilter, setSecretFilter] = useState(false);
  const [groupFilter, setGroupFilter] = useState(false);

  const toggleAdd = () => {
    setAddOn((prev) => !prev);
  };

  const toggleSecretFilter = () => {
    setSecretFilter((prev) => !prev);
  };

  const toggleGroupFilter = () => {
    setGroupFilter((prev) => !prev);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, myProfile, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  // Check if user exists on initial load and redirect if not
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getCurrentUser());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  // Show spinner while checking user state
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="w-full flex justify-center text-red-600">
        <p>Error loading user: {message}</p>
      </div>
    );
  }

  // Extract full name or provide a fallback
  const fullname =
    myProfile?.fullname?.firstname && myProfile?.fullname?.surname
      ? `${myProfile.fullname.firstname} ${myProfile.fullname.surname}`
      : "Guest";

  const calculateTimeDifference = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const units = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];

    for (const unit of units) {
      const interval = Math.floor(diffInSeconds / unit.seconds);
      if (interval >= 1) {
        return `${interval} ${unit.label}${interval > 1 ? "s" : ""}`;
      }
    }
    return "just now";
  };

  const formatPinsCount = (count) => {
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count;
  };

  return (
    <>
      <div className="fixed bg-white flex flex-col w-screen pt-10 pb-6 px-24">
        <div className="flex items-center justify-between w-full h-16">
          <div className="text-4xl font-bold text-zinc-800">
            Your Saved Ideas
          </div>
          <div className="flex h-full items-center gap-4">
            <img
              src={`/uploads/${myProfile?.profileImage}`}
              alt="profilePic"
              className="h-16 w-16 rounded-full"
            />
            <div className="flex flex-col">
              <div className="text-xl font-bold text-zinc-800">{fullname}</div>
              <div className="text-sm text-zinc-800">
                {myProfile?.following.length} Following
              </div>
            </div>
            <Link to={`/profile/${myProfile?.username}`}>
              <button className="bg-zinc-200 px-4 font-semibold text-zinc-700 py-3 rounded-full">
                View Profile
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full mt-8 h-12 flex px-4 items-center gap-6">
          <Link className="text-lg font-semibold hover:bg-zinc-200 px-3 py-2 rounded-lg">
            Pins
          </Link>
          <div className="underline underline-offset-8 text-lg font-semibold">
            Boards
          </div>
        </div>

        <div className="w-full mt-4 h-12 flex px-4 items-center gap-6 justify-between">
          <div className="flex items-center gap-4 h-full">
            <button onClick={toggleGroupFilter} className={`${secretFilter ? "pointer-events-none" : ""} px-4 py-2 rounded-full border-2 active:animate-jump active:animate-ease-out ${groupFilter ? "border-zinc-800 bg-zinc-800 text-white" : "border-zinc-200 hover:bg-zinc-100"}`}>
              Group
            </button>
            <button onClick={toggleSecretFilter} className={`${groupFilter ? "pointer-events-none" : ""} px-4 py-2 rounded-full border-2 active:animate-jump active:animate-ease-out ${secretFilter ? "border-zinc-800 bg-zinc-800 text-white" : "border-zinc-200 hover:bg-zinc-100"}`}>
              Secret
            </button>
          </div>
          <button
            onClick={toggleAdd}
            className={`w-12 h-full active:animate-jump active:animate-ease-out p-2 rounded-full ${
              addOn ? "bg-zinc-800" : "hover:bg-zinc-100"
            }`}
          >
            <img
              className={`w-full h-full ${addOn ? "invert" : ""}`}
              src="/add-fill.svg"
              alt=""
            />
          </button>
          <div className={`${addOn ? "animate-fade-up animate-duration-500 animate-ease-out" : "hidden"} z-50 absolute mt-48 mr-12 w-44 p-3 shadow-even bg-white h-32 rounded-xl right-0`}>
            <span className="w-full mb-2 text-zinc-500 text-xs px-2">Create</span>
            <Link to={`/create/pin`} className="w-full px-2 py-2 hover:bg-zinc-200 rounded-lg flex">Pin</Link>
            <Link to={`/create/board`} className="w-full px-2 py-2 hover:bg-zinc-200 rounded-lg flex">Board</Link>
          </div>
        </div>
      </div>

      <div className="w-screen pt-60">
        <div className="w-full px-20 mt-8 grid grid-cols-5 gap-4">
          {myProfile?.boards?.map((elem) => (
            <Link
              to={`/board/${elem._id}`}
              className={`h-56 w-60 mb-2 ${groupFilter && (!elem?.collaborators || elem?.collaborators?.length < 1) ? "hidden" : ""} ${secretFilter && !elem?.isSecret ? "hidden" : ""}`}
              key={elem._id}
            >
              {elem?.isSecret ? (
                <div className="absolute z-50 h-8 w-8 p-2 bg-white mt-2 ml-2 rounded-full">
                  <img
                    src="/Padlock-Square-1--Streamline-Core.svg"
                    className="h-full w-full"
                    alt=""
                  />
                </div>
              ) : null}
              <div className="h-40 w-full flex rounded-2xl overflow-hidden">
                <div
                  className={`h-40 w-40 border-r-2 overflow-hidden border-white ${
                    elem?.pins[elem?.pins.length - 1]?.file?.filename
                      ? ""
                      : "bg-zinc-200"
                  }`}
                >
                  {elem?.pins[elem?.pins?.length - 1]?.file?.filename ? (
                    <img
                      src={`/uploads/${
                        elem?.pins[elem?.pins.length - 1]?.file?.filename
                      }`}
                      className="object-cover object-top w-full h-full"
                      alt=""
                    />
                  ) : null}
                </div>
                <div className="flex flex-col w-20 h-40">
                  <div
                    className={`h-1/2 w-full border-b-2  overflow-hidden border-white ${
                      elem?.pins[elem?.pins.length - 2]?.file?.filename
                        ? ""
                        : "bg-zinc-200"
                    }`}
                  >
                    {elem?.pins[elem?.pins?.length - 2]?.file?.filename ? (
                      <img
                        src={`/uploads/${
                          elem?.pins[elem?.pins.length - 2]?.file?.filename
                        }`}
                        className="object-cover object-top w-full h-full"
                        alt=""
                      />
                    ) : null}
                  </div>
                  <div
                    className={`h-1/2 w-full  overflow-hidden ${
                      elem?.pins[elem?.pins.length - 3]?.file?.filename
                        ? ""
                        : "bg-zinc-200"
                    }`}
                  >
                    {elem?.pins[elem?.pins?.length - 3]?.file?.filename ? (
                      <img
                        src={`/uploads/${
                          elem?.pins[elem?.pins.length - 3]?.file?.filename
                        }`}
                        className="object-cover object-top w-full h-full"
                        alt=""
                      />
                    ) : null}
                  </div>
                </div>
              </div>
              <span className="ml-2 mt-2 text-xl flex font-semibold">
                {elem?.title}
              </span>
              <span className="ml-2 text-sm text-zinc-500">
                {formatPinsCount(elem?.pins.length)} Pins • {calculateTimeDifference(elem?.updatedAt)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

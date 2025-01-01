import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner"; // Import your Spinner component
import { getCurrentUser, reset } from "../redux/auth/auth.slice";

const Dashboard = () => {
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
            <button className="px-4 py-2 border-2 border-zinc-200 rounded-full">
              Group
            </button>
            <button className="px-4 py-2 border-2 border-zinc-200 rounded-full">
              Secret
            </button>
          </div>
          <div className="w-12 h-full p-2 hover:bg-zinc-100 rounded-full">
            <img className="w-full h-full" src="/add-fill.svg" alt="" />
          </div>
        </div>
      </div>

      <div className="w-screen pt-60">
        <div className="w-full px-20 mt-8 grid grid-cols-5 gap-4">
          {myProfile?.boards?.map((elem) => (
            <Link to={`/board/${elem._id}`} className="h-56 w-60 mb-2">
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
                <div className="h-40 w-40 border-r-2 border-white bg-zinc-200"></div>
                <div className="flex flex-col w-20 h-40">
                  <div className="h-1/2 w-full border-b-2 border-white bg-zinc-200"></div>
                  <div className="h-1/2 w-full bg-zinc-200"></div>
                </div>
              </div>
              <span className="ml-2 mt-2 text-xl flex font-semibold">
                {elem?.title}
              </span>
              <span className="ml-2 text-sm text-zinc-500">
                {elem?.pins.length} Pins
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

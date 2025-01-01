import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProfile, reset } from "../redux/auth/auth.slice";
import Spinner from "../components/Spinner";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userName } = useParams();

  const { user, selectedProfile, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const [isBioExpanded, setIsBioExpanded] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getProfile(userName));
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, userName]);

  const toggleBio = () => {
    setIsBioExpanded(!isBioExpanded);
  };

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

  return (
    <>
      <Link
        to="/dashboard"
        className="fixed h-12 w-12 left-0 ml-6 mt-6 p-3 hover:bg-zinc-100 rounded-full"
      >
        <img
          src="/Arrow-Up-1--Streamline-Core.svg"
          className="h-full w-full -rotate-90"
          alt=""
        />
      </Link>

      <div className="w-screen py-8 px-20">
        <div className="w-full h-32 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img
              src={`/uploads/${selectedProfile?.profileImage}`}
              className="object-cover object-center w-full"
              alt=""
            />
          </div>
        </div>

        <span className="w-full flex items-center justify-center text-4xl mt-2 font-bold">
          {selectedProfile?.fullname.firstname}{" "}
          {selectedProfile?.fullname.surname}
        </span>

        <div
          className={`${
            selectedProfile?.bio.trim() !== "" ? "mt-2 mb-2" : ""
          }flex w-full justify-center`}
        >
          {selectedProfile?.bio && selectedProfile?.bio.trim() !== "" && (
            <div className="flex items-center gap-1 justify-center w-[40rem]">
              <p
                className={`inline-block max-w-full text-center ${
                  isBioExpanded ? "" : "truncate"
                }`}
              >
                {isBioExpanded
                  ? selectedProfile.bio
                  : `${selectedProfile.bio.slice(0, 40)}...`}

                <button
                  onClick={toggleBio}
                  className="text-zinc-600 text-sm font-semibold ml-2"
                >
                  {isBioExpanded ? "Show less" : "Show more"}
                </button>
              </p>
            </div>
          )}
        </div>

        <span className="w-full flex gap-1 items-center justify-center text-zinc-400 font-normal">
          <img src="/pinterest-fill-@.svg" className="h-5" alt="" />
          {selectedProfile?.username}
        </span>
        <span className="w-full mt-2 flex items-center justify-center font-light">
          {selectedProfile?.following.length} following
        </span>

        <div className="w-full flex mt-2 items-center justify-center gap-4">
          <button className="bg-zinc-200 rounded-full px-5 py-3 font-semibold">
            Share
          </button>
          <Link className="bg-zinc-200 rounded-full px-5 py-3 font-semibold">
            Edit Profile
          </Link>
        </div>
      </div>

      <div className="w-screen px-20 mt-8 grid grid-cols-5 gap-4">
        <div className="h-56 w-60 mb-2">
          <div className="h-40 w-full flex justify-between">
            <div className="h-40 border-r-2 border-white rounded-2xl w-28 bg-zinc-200 z-50"></div>
            <div className="h-40 border-r-2 border-white rounded-2xl absolute ml-[2.7rem] w-28 bg-zinc-200 z-40"></div>
            <div className="h-40 border-r-2 border-white rounded-2xl absolute ml-[5.4rem] w-28 bg-zinc-200 z-30"></div>
            <div className="h-40 rounded-2xl w-28 bg-zinc-200 z-10"></div>
          </div>
          <span className="ml-2 mt-2 text-xl flex font-semibold">All Pins</span>
          <span className="ml-2 text-sm text-zinc-500">1.3k Pins</span>
        </div>

        {selectedProfile?.publicBoards?.map((elem) => (
          <div className="h-56 w-60 mb-2">
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
            <span className="ml-2 text-sm text-zinc-500">{elem?.pins.length} Pins</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Profile;
